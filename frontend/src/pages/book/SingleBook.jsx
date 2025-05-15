import { Link, useParams } from "react-router-dom";
import {
  useGetSingleBookQuery,
  useAddReviewMutation,
} from "../../redux/bookApi";
import { useGetProfileQuery } from "../../redux/userApi";
import defaultImg from "../../assets/book-1.jpg";
import { useState } from "react";

const SingleBook = () => {
  const { id } = useParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [addReview] = useAddReviewMutation();
  const { data: book, isLoading, error } = useGetSingleBookQuery(id);
  const { data: user, isLoading: userLoading } = useGetProfileQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error || !book) return <p>Book not found.</p>;

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please log in to submit a review.");
      return;
    }

    if (rating < 1 || rating > 5) {
      alert("Please provide a rating between 1 and 5.");
      return;
    }

    try {
      await addReview({
        bookId: id,
        review: { rating, comment },
      }).unwrap();

      setRating(0);
      setComment("");
      alert("Review added!");
    } catch (err) {
      console.error("Failed to submit review:", err);
      alert("Error submitting review");
    }
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Book Image */}
          <div className="w-full flex justify-center">
            <img
              src={book.img || defaultImg}
              alt={book.title}
              className="w-full max-w-sm rounded shadow-lg object-contain"
            />
          </div>

          {/* Book Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-gray-600">
              by <span className="font-medium">{book.author}</span>
            </p>

            <div className="flex items-center gap-2">
              <span className="text-yellow-500 font-medium text-lg">
                ⭐ {book.averageRating?.toFixed(1) || "0.0"}
              </span>
              <span className="text-sm text-gray-500">
                ({book.numReviews || 0} reviews)
              </span>
            </div>

            <p className="text-gray-700">{book.description}</p>

            <p className="text-2xl font-semibold text-green-700">
              ${book.price}
            </p>

            <button
              onClick={() => alert("Added to cart")}
              className="bg-amber-500 text-white px-5 py-2 rounded hover:bg-amber-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <div className="bg-gray-50 py-10 px-4 mt-10 border-t">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Customer Reviews
          </h2>

          {/* Review List */}
          {book.reviews?.length > 0 ? (
            <div className="space-y-6 mb-10">
              {book.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-900">
                      {review.user?.name || "Anonymous"}
                    </span>
                    <span className="text-yellow-500 font-medium">
                      ⭐ {review.rating}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mb-10">
              No reviews yet. Be the first to review this book!
            </p>
          )}

          {/* Review Form Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-12">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Write a Review
            </h3>

            {user ? (
              <form onSubmit={handleSubmitReview} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Rating{" "}
                    <span className="text-sm text-gray-400">
                      (1 = poor, 5 = excellent)
                    </span>
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                  >
                    <option value="">Select rating</option>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Comment
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 p-2 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Write your thoughts about this book..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Submit Review
                </button>
              </form>
            ) : (
              <p className="text-gray-600">
                Please{" "}
                <Link
                  to="/login"
                  className="text-blue-600 underline font-medium"
                >
                  log in
                </Link>{" "}
                to write a review.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
