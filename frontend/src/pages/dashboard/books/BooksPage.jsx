import { Link } from 'react-router-dom';
import { useGetBooksQuery, useDeleteBookMutation } from "../../../redux/bookApi";

const BooksPage = () => {
  const { data: books = [] } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id).unwrap();
      } catch (err) {
        console.error('Error deleting book:', err);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">📚 All Books</h2>
        <Link
          to="/dashboard/add-book"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          ➕ Add Book
        </Link>
      </div>

      <ul className="space-y-3">
        {books.map((book) => (
          <li
            key={book._id}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <span className="font-medium">{book.title}</span>
            <div className="space-x-2">
              <button
                onClick={() => alert(`Edit book: ${book._id}`)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(book._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksPage;
