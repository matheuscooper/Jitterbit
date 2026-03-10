const database = require("@config/database");
const { schema } = require("@database");

const OrderRepository = require("@repositories/implementations/OrderRepository");
const GetOrderByIdUseCase = require("./GetOrderByIdUseCase");
const GetOrderByIdController = require("./GetOrderByIdController");

const orderRepository = new OrderRepository(database, schema);
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);
const getOrderByIdControllerFactory = new GetOrderByIdController(
  getOrderByIdUseCase,
);

module.exports = {
  getOrderByIdControllerFactory,
};
