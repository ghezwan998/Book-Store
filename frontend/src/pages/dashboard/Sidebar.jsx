import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-48 h-screen bg-gray-800 text-white fixed top-0 left-0 shadow-lg">
      <Link to='/dashboard/'>
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">📘 Store Admin</h2>
        </div>
      </Link>
      <nav className="p-2 flex flex-col gap-2">
        <Link
          to="/dashboard/books"
          className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded transition-all"
        >
          📚 Manage Books
        </Link>
        <Link
          to="/dashboard/users"
          className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded transition-all"
        >
          👥 Manage Users
        </Link>
        <Link
          to="/dashboard/orders"
          className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded transition-all"
        >
          🛒 Orders
        </Link>
        <Link
          to="/logout"
          className="block px-4 py-2 text-gray-200 hover:bg-gray-700 rounded transition-all"
        >
          🚪 Logout
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
