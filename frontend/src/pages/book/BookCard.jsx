import imgDefualt from "../../assets/book-1.jpg";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cart";
import { useDispatch } from "react-redux";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const imagePath = book.img ? `http://localhost:5000/${book.img}` : imgDefualt;  

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: book._id,
        name: book.title,
        price: book.price,
        image: book.img,
      })
    );
    alert("book added to cart");
  };



  return (
    <div className="shadow rounded p-3 hover:scale-105 transition bg-white">
      <Link to={`/book/${book._id}`}>
        {/* Image Container */}
        <div className="">
          <img
            src={imagePath}
            alt={book.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title */}
        <h1 className="text-lg font-semibold mt-3 line-clamp-2">{book.title}</h1>

        {/* ⭐ Rating Section */}
        <div className="flex items-center gap-2 text-sm mt-1">
          <span className="text-yellow-500 font-semibold">
            ⭐ {book.averageRating?.toFixed(1) || "0.0"}
          </span>
          <span className="text-gray-500">
            ({book.numReviews || 0} reviews)
          </span>
        </div>

        {/* Price */}
        <p className="text-green-700 font-bold mt-1">${book.price}</p>
      </Link>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="bg-amber-400 text-black font-medium w-full py-2 rounded mt-3 hover:bg-amber-500 transition"
      >
        Add to cart
      </button>
    </div>
  );
};

export default BookCard;
