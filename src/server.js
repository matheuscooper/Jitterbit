require("module-alias/register");
require("dotenv").config();

const app = require("./app");

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
