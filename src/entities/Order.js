const OrderItem = require("./OrderItem");

/**
 * @typedef {Object} OrderProps
 * @property {string} orderId
 * @property {number} value
 * @property {Date} creationDate
 * @property {Array} items
 */

class Order {
  /**
   * @param {OrderProps} props
   */
  constructor(props) {
    this.props = {
      ...props,
      items:
        props.items ||
        [].map((item) => {
          item instanceof OrderItem ? item : new OrderItem();
        }),
    };
  }

  get orderId() {
    return this.props.orderId;
  }

  get value() {
    return this.props.value;
  }

  get creationDate() {
    return this.props.creationDate;
  }

  get items() {
    return this.props.items.map((item) =>
      item instanceof OrderItem ? item : new OrderItem(item),
    );
  }

  toJSON() {
    return {
      orderId: this.orderId,
      value: this.value,
      creationDate: this.creationDate,
      items: this.items.map((item) => item.toJSON()),
    };
  }
}

module.exports = Order;
