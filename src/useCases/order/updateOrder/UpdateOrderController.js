class UpdateOrderController {
  constructor(updateOrderUseCase) {
    this.updateOrderUseCase = updateOrderUseCase;
  }

  async handle(req, res) {
    try {
      const { orderId } = req.params;
      const payload = req.body;

      const updatedOrder = await this.updateOrderUseCase.execute(
        orderId,
        payload,
      );

      return res.status(200).json(updatedOrder);
    } catch (error) {
      if (error.message === "Order not found") {
        return res.status(404).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  }
}

module.exports = UpdateOrderController;
