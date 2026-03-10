const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("@config/swagger");

const orderRoutes = require("@routes/orderRoutes");
const authRoutes = require("@routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(authRoutes);
app.use(orderRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API rodando com sucesso !" });
});

module.exports = app;
