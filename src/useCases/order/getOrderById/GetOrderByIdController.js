class GetOrderByIdController {
  constructor(getOrderByIdUseCase) {
    this.getOrderByIdUseCase = getOrderByIdUseCase;
  }

  async handle(req, res) {
    try {
      const { orderId } = req.params;

      const order = await this.getOrderByIdUseCase.execute(orderId);

      return res.status(200).json(order);
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

module.exports = GetOrderByIdController;
