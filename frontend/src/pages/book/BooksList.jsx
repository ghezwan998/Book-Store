import { useGetBooksQuery } from "../../redux/bookApi";
import BookCard from "./BookCard";

const BooksList = () => {
  const { data: books = [], error, isLoading } = useGetBooksQuery();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Discover ALL Our Books
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.length > 0 &&
            books.map((book, index) => <BookCard key={index} book={book} />)}
        </div>
      </div>
    </div>
  );
};

export default BooksList;
