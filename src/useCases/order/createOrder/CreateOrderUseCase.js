const Order = require("@entities/Order");

class CreateOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(data) {
    const existingOrder = await this.orderRepository.findById(data.orderId);

    if (existingOrder) {
      throw new Error("Order already exists");
    }

    const order = new Order({
      orderId: data.orderId,
      value: data.value,
      creationDate: data.creationDate,
      items: data.items,
    });

    return await this.orderRepository.create(order);
  }
}

module.exports = CreateOrderUseCase;
