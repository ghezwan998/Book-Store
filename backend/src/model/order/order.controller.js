const Order = require("./order.model");
const Book = require('../book/book.model')

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email') 
      .populate('books.bookId', 'title'); 

    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: err.message });
  }
};

const getOrder = async (req, res) => {};

const newOrder = async (req, res) => {
    const { books } = req.body;

    if (!books?.length) {
      return res.status(400).json({ msg: 'No books in the order' });
    }
  
    try {
      const bookIds = books.map(b => b.bookId);
      const dbBooks = await Book.find({ _id: { $in: bookIds } });
  
      let totalPrice = 0;
      for (const item of books) {
        const book = dbBooks.find(b => b._id.toString() === item.bookId);
        if (!book) return res.status(404).json({ msg: 'Book not found' });
  
        totalPrice += book.price * item.quantity;
      }
  
      const order = await Order.create({
        user: req.user.id,
        books,
        totalPrice,
      });
  
      res.status(201).json(order);
    } catch (err) {
      console.error(err);
      res.status(500).json({ msg: 'Error placing order' });
    }
};

const deleteOrder = async(req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete order' });
  }
}

const deliverOrder = async(req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = 'Delivered';
    await order.save();
    res.json({ message: 'Order marked as delivered' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update order' });
  }
}

module.exports = { getAllOrder, getOrder, newOrder, deleteOrder, deliverOrder };
