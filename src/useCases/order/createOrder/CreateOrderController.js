const { mapExternalOrderToDomain } = require("@mappers/orderMapper");

class CreateOrderController {
  constructor(createOrderUseCase) {
    this.createOrderUseCase = createOrderUseCase;
  }

  async handle(req, res) {
    try {
      const mappedOrder = mapExternalOrderToDomain(req.body);

      const order = await this.createOrderUseCase.execute(mappedOrder);

      return res.status(201).json(order);
    } catch (error) {
      if (error.message === "Order already exists") {
        return res.status(409).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: error.message || "Internal server error",
      });
    }
  }
}

module.exports = CreateOrderController;
