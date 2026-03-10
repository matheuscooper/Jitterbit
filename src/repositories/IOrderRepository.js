class IOrderRepository {
  async create(order) {
    throw new Error("Method 'create()' must be implemented.");
  }

  async findById(orderId) {
    throw new Error("Method 'findById()' must be implemented.");
  }

  async findAll() {
    throw new Error("Method 'findAll()' must be implemented.");
  }

  async update(orderId, order) {
    throw new Error("Method 'update()' must be implemented.");
  }

  async delete(orderId) {
    throw new Error("Method 'delete()' must be implemented.");
  }
}

module.exports = IOrderRepository;
