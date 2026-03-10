const { eq } = require("drizzle-orm");
const IOrderRepository = require("@repositories/IOrderRepository");
const Order = require("@entities/Order");
const OrderItem = require("@entities/OrderItem");

class OrderRepository extends IOrderRepository {
  constructor(db, schema) {
    super();
    this.db = db;
    this.orderSchema = schema.orderSchema;
    this.orderItemSchema = schema.orderItemSchema;
  }

  async create(order) {
    await this.db.transaction(async (tx) => {
      await tx.insert(this.orderSchema).values({
        orderId: order.orderId,
        value: order.value,
        creationDate: order.creationDate,
      });

      if (order.items.length > 0) {
        await tx.insert(this.orderItemSchema).values(
          order.items.map((item) => ({
            orderId: order.orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        );
      }
    });

    return order;
  }

  async findById(orderId) {
    const orders = await this.db
      .select()
      .from(this.orderSchema)
      .where(eq(this.orderSchema.orderId, orderId));

    if (!orders.length) {
      return null;
    }

    const items = await this.db
      .select()
      .from(this.orderItemSchema)
      .where(eq(this.orderItemSchema.orderId, orderId));

    return new Order({
      orderId: orders[0].orderId,
      value: Number(orders[0].value),
      creationDate: orders[0].creationDate,
      items: items.map(
        (item) =>
          new OrderItem({
            productId: item.productId,
            quantity: item.quantity,
            price: Number(item.price),
          }),
      ),
    });
  }

  async findAll() {
    const orders = await this.db.select().from(this.orderSchema);

    const result = [];

    for (const order of orders) {
      const items = await this.db
        .select()
        .from(this.orderItemSchema)
        .where(eq(this.orderItemSchema.orderId, order.orderId));

      result.push(
        new Order({
          orderId: order.orderId,
          value: Number(order.value),
          creationDate: order.creationDate,
          items: items.map(
            (item) =>
              new OrderItem({
                productId: item.productId,
                quantity: item.quantity,
                price: Number(item.price),
              }),
          ),
        }),
      );
    }

    return result;
  }

  async update(orderId, order) {
    const existingOrder = await this.findById(orderId);

    if (!existingOrder) {
      return null;
    }

    await this.db.transaction(async (tx) => {
      await tx
        .update(this.orderSchema)
        .set({
          value: order.value,
          creationDate: order.creationDate,
        })
        .where(eq(this.orderSchema.orderId, orderId));

      await tx
        .delete(this.orderItemSchema)
        .where(eq(this.orderItemSchema.orderId, orderId));

      if (order.items.length > 0) {
        await tx.insert(this.orderItemSchema).values(
          order.items.map((item) => ({
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        );
      }
    });

    return new Order({
      orderId,
      value: order.value,
      creationDate: order.creationDate,
      items: order.items,
    });
  }

  async delete(orderId) {
    const existingOrder = await this.findById(orderId);

    if (!existingOrder) {
      return false;
    }

    await this.db.transaction(async (tx) => {
      await tx
        .delete(this.orderItemSchema)
        .where(eq(this.orderItemSchema.orderId, orderId));

      await tx
        .delete(this.orderSchema)
        .where(eq(this.orderSchema.orderId, orderId));
    });

    return true;
  }
}

module.exports = OrderRepository;
