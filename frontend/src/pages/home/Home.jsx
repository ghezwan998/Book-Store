import React from "react";
import { Link } from 'react-router-dom';
import Banner from "./Banner";
import { useGetBooksQuery } from "../../redux/bookApi";
import BookCard from "../book/BookCard";

const Home = () => {
  const { data: books = [], isLoading } = useGetBooksQuery();

  const topRated = [...books]
    .filter(book => book.reviews?.length > 0)
    .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
    .slice(0, 6);

  const newBooks = [...books]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 mt-5">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to <span className="text-yellow-300">ReadMore Bookstore</span>
          </h1>
          <p className="text-lg md:text-xl">
            Discover your next favorite book across all genres.
          </p>
          <Link
            to="/book-list"
            className="inline-block mt-4 bg-yellow-400 text-black font-semibold px-6 py-3 rounded shadow hover:bg-yellow-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <Feature icon="🚚" title="Free Shipping" desc="On orders over $50" />
          <Feature icon="💳" title="Secure Payment" desc="100% safe checkout" />
          <Feature icon="📞" title="24/7 Support" desc="We're always here to help" />
        </div>
      </section>

      {/* New Books */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🆕 New Arrivals</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-full">
            {newBooks.map(book => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">🌟 Top Rated Books</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topRated.map(book => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-6 bg-indigo-700 text-white text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold">📬 Stay in the loop</h2>
          <p>Subscribe for new arrivals and exclusive deals</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-3 rounded text-black w-full md:w-auto"
            />
            <button className="bg-yellow-400 text-black px-5 py-3 rounded hover:bg-yellow-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

// Reusable Feature Card
const Feature = ({ icon, title, desc }) => (
  <div className="space-y-3">
    <div className="text-4xl">{icon}</div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default Home;
