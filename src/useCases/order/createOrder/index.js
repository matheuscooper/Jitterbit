const { schema } = require("@database");
const database = require("@config/database");

const OrderRepository = require("@repositories/implementations/OrderRepository");
const CreateOrderUseCase = require("./CreateOrderUseCase");
const CreateOrderController = require("@useCases/order/createOrder/CreateOrderController");

const orderRepository = new OrderRepository(database, schema);

const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const createOrderControllerFactory = new CreateOrderController(
  createOrderUseCase,
);

module.exports = {
  createOrderControllerFactory,
};
