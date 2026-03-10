const database = require("@config/database");
const { schema } = require("@database");

const OrderRepository = require("@repositories/implementations/OrderRepository");
const GetAllOrdersUseCase = require("./GetAllOrdersUseCase");
const GetAllOrdersController = require("./GetAllOrdersController");

const orderRepository = new OrderRepository(database, schema);
const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
const getAllOrdersControllerFactory = new GetAllOrdersController(
  getAllOrdersUseCase,
);

module.exports = {
  getAllOrdersControllerFactory,
};
