class GetAllOrdersController {
  constructor(getAllOrdersUseCase) {
    this.getAllOrdersUseCase = getAllOrdersUseCase;
  }

  async handle(req, res) {
    try {
      const orders = await this.getAllOrdersUseCase.execute();

      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  }
}

module.exports = GetAllOrdersController;
