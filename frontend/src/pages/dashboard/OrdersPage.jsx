import React from 'react'
import { useDeleteOrderMutation, useGetAllOrdersQuery, useMarkAsDeliveredMutation } from '../../redux/orderApi';

const OrdersPage = () => {
  const {  data: orders = [], isLoading, error } = useGetAllOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [markAsDelivered] = useMarkAsDeliveredMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      await deleteOrder(id);
    }
  };

  const handleDeliver = async (id) => {
    await markAsDelivered(id);
  };

  if (isLoading) return <p className="text-gray-600">Loading orders...</p>;

  if (error) {
    return (
      <p className="text-red-500">
        Failed to load orders: {error?.data?.message || error.error}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">📦 All Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li
              key={order._id}
              className="bg-white p-4 rounded shadow border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    🧑 {order.user?.name} ({order.user?.email})
                  </p>
                  <p className="text-sm text-gray-600">
                    📅 {new Date(order.orderTime).toLocaleString()}
                  </p>
                  <p className="text-sm">
                    📍 Address: {order.address?.street}, {order.address?.city},{' '}
                    {order.address?.country}
                  </p>
                  <p className="text-sm">📞 Phone: {order.phone || 'N/A'}</p>
                  <p className="text-sm">
                    🛒 {order.books?.length || 0} item(s) | 💰 $
                    {order.totalPrice?.toFixed(2)}
                  </p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 text-xs rounded font-medium ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-x-2">
                  {order.status !== 'Delivered' && (
                    <button
                      onClick={() => handleDeliver(order._id)}
                      className="bg-blue-500 text-white px-3 py-1 text-sm rounded hover:bg-blue-600"
                    >
                      Mark Delivered
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Ordered books list */}
              {Array.isArray(order.books) && (
                <ul className="mt-2 text-sm text-gray-700 pl-4 list-disc">
                  {order.books.map((item, index) => (
                    <li key={index}>
                      {item.bookId?.title || 'Unknown Book'} × {item.quantity}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrdersPage