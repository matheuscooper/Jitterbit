const database = require("@config/database");
const { schema } = require("@database");

const OrderRepository = require("@repositories/implementations/OrderRepository");
const DeleteOrderUseCase = require("./DeleteOrderUseCase");
const DeleteOrderController = require("./DeleteOrderController");

const orderRepository = new OrderRepository(database, schema);
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);
const deleteOrderControllerFactory = new DeleteOrderController(
  deleteOrderUseCase,
);

module.exports = {
  deleteOrderControllerFactory,
};
