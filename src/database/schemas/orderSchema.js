const { pgTable, varchar, timestamp, numeric } = require("drizzle-orm/pg-core");

const orderSchema = pgTable("orders", {
  orderId: varchar("order_id").primaryKey(),
  value: numeric("value").notNull(),
  creationDate: timestamp("creation_date", { withTimezone: true }).notNull(),
});

module.exports = { orderSchema };
