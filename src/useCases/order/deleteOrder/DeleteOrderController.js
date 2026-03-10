class DeleteOrderController {
  constructor(deleteOrderUseCase) {
    this.deleteOrderUseCase = deleteOrderUseCase;
  }

  async handle(req, res) {
    try {
      const { orderId } = req.params;

      await this.deleteOrderUseCase.execute(orderId);

      return res.status(200).json({
        message: "Order deleted successfully",
      });
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

module.exports = DeleteOrderController;
