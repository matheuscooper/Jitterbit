const {
  pgTable,
  varchar,
  integer,
  numeric,
  serial,
} = require("drizzle-orm/pg-core");

const { orderSchema } = require("./orderSchema");

const orderItemSchema = pgTable("order_items", {
  id: serial("id").primaryKey(),

  orderId: varchar("order_id")
    .notNull()
    .references(() => orderSchema.orderId, {
      onDelete: "cascade",
    }),

  productId: integer("product_id").notNull(),

  quantity: integer("quantity").notNull(),

  price: numeric("price").notNull(),
});

module.exports = { orderItemSchema };
