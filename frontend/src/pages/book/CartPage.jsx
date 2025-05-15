import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  clearCart,
  increaseQty,
  decreaseQty,
} from "../../redux/cart";
import { Link } from "react-router-dom";
import imgDefualt from "../../assets/book-1.jpg";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-4 pt-10">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
          Your Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image ? `http://localhost:5000/${item.image}` : imgDefualt}
                      alt={item.name}
                      className="w-16 h-20 object-cover rounded shadow-sm border"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">${item.price}</p>

                      <div className="flex items-center mt-2 space-x-2">
                        <button
                          onClick={() => dispatch(decreaseQty(item.id))}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          –
                        </button>
                        <span className="text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increaseQty(item.id))}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Total Price Display */}
            <div className="flex justify-between items-center text-lg font-semibold text-gray-800 pt-2 border-t">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded"
              >
                Clear Cart
              </button>

              <Link
                to="/order"
                className="block text-center w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
