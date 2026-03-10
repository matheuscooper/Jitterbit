const { Router } = require("express");
const {
  createOrderControllerFactory,
} = require("@useCases/order/createOrder/index");
const {
  getAllOrdersControllerFactory,
} = require("@useCases/order/getAllOrders/index");
const {
  getOrderByIdControllerFactory,
} = require("@useCases/order/getOrderById/index");
const {
  updateOrderControllerFactory,
} = require("@useCases/order/updateOrder/index");
const {
  deleteOrderControllerFactory,
} = require("@useCases/order/deleteOrder/index");

const orderRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOrderInput:
 *       type: object
 *       properties:
 *         numeroPedido:
 *           type: string
 *           example: v10089015vdb-01
 *         valorTotal:
 *           type: number
 *           example: 10000
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           example: 2023-07-19T12:24:11.5299601+00:00
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               idItem:
 *                 type: string
 *                 example: "2434"
 *               quantidadeItem:
 *                 type: integer
 *                 example: 1
 *               valorItem:
 *                 type: number
 *                 example: 1000
 *
 *     OrderResponse:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *           example: v10089015vdb
 *         value:
 *           type: number
 *           example: 10000
 *         creationDate:
 *           type: string
 *           format: date-time
 *           example: 2023-07-19T12:24:11.529Z
 *         items:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 2434
 *               quantity:
 *                 type: integer
 *                 example: 1
 *               price:
 *                 type: number
 *                 example: 1000
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrderInput'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       409:
 *         description: Order already exists
 *       500:
 *         description: Internal server error
 */
orderRouter.post("/order", (req, res) => {
  return createOrderControllerFactory.handle(req, res);
});

/**
 * @swagger
 * /order:
 *   get:
 *     summary: List all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderResponse'
 *       500:
 *         description: Internal server error
 */
orderRouter.get("/order", (req, res) => {
  return getAllOrdersControllerFactory.handle(req, res);
});

/**
 * @swagger
 * /order/{orderId}:
 *   get:
 *     summary: Get order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: v10089015vdb
 *     responses:
 *       200:
 *         description: Order found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
orderRouter.get("/order/:orderId", (req, res) => {
  return getOrderByIdControllerFactory.handle(req, res);
});

/**
 * @swagger
 * /order/{orderId}:
 *   put:
 *     summary: Update an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: v10089015vdb
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: number
 *                 example: 15000
 *               creationDate:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-07-19T12:24:11.529Z
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 2434
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     price:
 *                       type: number
 *                       example: 1000
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderResponse'
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
orderRouter.put("/order/:orderId", (req, res) => {
  return updateOrderControllerFactory.handle(req, res);
});

/**
 * @swagger
 * /order/{orderId}:
 *   delete:
 *     summary: Delete an order
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         example: v10089015vdb
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal server error
 */
orderRouter.delete("/order/:orderId", (req, res) => {
  return deleteOrderControllerFactory.handle(req, res);
});

module.exports = orderRouter;
