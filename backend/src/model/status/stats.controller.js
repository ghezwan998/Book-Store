const User = require('../user/user.model')
const Order = require('../order/order.model')
const Book = require('../book/book.model')

const getDashboardStats = async (req, res) => {
    try {
      const [totalOrders, totalRevenue, totalUsers, totalBooks, statusBreakdown] = await Promise.all([
        Order.countDocuments(),
        Order.aggregate([{ $group: { _id: null, total: { $sum: "$totalPrice" } } }]),
        User.countDocuments(),
        Book.countDocuments(),
        Order.aggregate([
          { $group: { _id: "$status", count: { $sum: 1 } } }
        ])
      ]);
  
      res.json({
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalUsers,
        totalBooks,
        statusBreakdown,
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to load stats', error: err.message });
    }
  };

module.exports = { getDashboardStats }