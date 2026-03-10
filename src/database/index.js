const { orderSchema } = require("./schemas/orderSchema");
const { orderItemSchema } = require("./schemas/orderItemSchema");

const schema = {
  orderSchema,
  orderItemSchema,
};

module.exports = { orderSchema, orderItemSchema, schema };
