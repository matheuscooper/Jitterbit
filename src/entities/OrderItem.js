/**
 * @typedef {Object} OrderItemProps
 * @property {number} productId
 * @property {number} quantity
 * @property {number} price
 */

class OrderItem {
  /**
   * @param {OrderItemProps} props
   */
  constructor(props) {
    this.props = props;
  }

  get productId() {
    return this.props.productId;
  }

  get quantity() {
    return this.props.quantity;
  }

  get price() {
    return this.props.price;
  }

  toJSON() {
    return {
      productId: this.productId,
      quantity: this.quantity,
      price: this.price,
    };
  }
}

module.exports = OrderItem;
