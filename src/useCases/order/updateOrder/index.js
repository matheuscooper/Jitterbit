const database = require("@config/database");
const { schema } = require("@database");

const OrderRepository = require("@repositories/implementations/OrderRepository");
const UpdateOrderUseCase = require("./UpdateOrderUseCase");
const UpdateOrderController = require("./UpdateOrderController");

const orderRepository = new OrderRepository(database, schema);
const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
const updateOrderControllerFactory = new UpdateOrderController(
  updateOrderUseCase,
);

module.exports = {
  updateOrderControllerFactory,
};
