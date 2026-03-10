class UpdateOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId, data) {
    const existingOrder = await this.orderRepository.findById(orderId);

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    const updatedOrder = {
      orderId,
      value: data.value,
      creationDate: new Date(data.creationDate),
      items: data.items,
    };

    return await this.orderRepository.update(orderId, updatedOrder);
  }
}

module.exports = UpdateOrderUseCase;
