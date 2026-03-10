class DeleteOrderUseCase {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId) {
    const existingOrder = await this.orderRepository.findById(orderId);

    if (!existingOrder) {
      throw new Error("Order not found");
    }

    await this.orderRepository.delete(orderId);
  }
}

module.exports = DeleteOrderUseCase;
