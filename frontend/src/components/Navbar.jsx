import {useState} from "react";
import { useGetProfileQuery, useLogoutMutation } from "../redux/userApi";
import { Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png";
import { GoSearch } from "react-icons/go";
import { IoCartOutline } from "react-icons/io5";
import { FaUserCircle } from 'react-icons/fa';
import { useDispatch } from "react-redux";
import { userApi } from "../redux/userApi";

const Navbar = () => {

  const navigate = useNavigate();

  const { data: user, isLoading, error } = useGetProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout().unwrap();
    setOpen(false);
    dispatch(userApi.util.resetApiState()); // 🔥 clear all cached queries
    navigate('/');
  };

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3 ">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo & Title */}

        <Link to="/" className="flex items-center space-x-2">
          <img
            src={logo} // Replace with your logo path
            alt="Logo"
            className="h-12 w-12"
          />
          <span className="text-xl font-bold text-gray-800">MyStore</span>
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-amber-400 hover:underline">
            Home
          </Link>
          <Link to="about" className="hover:text-amber-400 hover:underline">
            About
          </Link>
          <Link to="book-list" className="hover:text-amber-400 hover:underline">
            Products
          </Link>
          <Link to="contact" className="hover:text-amber-400 hover:underline">
            Contact
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4 relative">
          {/* Search (Icon always visible, input expands left) */}
          <div className="relative group">
            {/* Search Icon */}
            <GoSearch className="text-gray-600 hover:text-amber-400 w-5 h-5 cursor-pointer z-20 relative" />

            {/* Expanding Input */}
            <input
              type="text"
              placeholder="Search..."
              className="absolute top-1/2 -right-2 transform -translate-y-1/2
                            w-0 group-hover:w-48 focus:w-48
                            opacity-0 group-hover:opacity-100 focus:opacity-100
                            transition-all duration-300 ease-in-out
                            pl-2 pr-4 py-2 border border-gray-300 rounded-full
                            focus:outline-none focus:ring-2 bg-white z-10"
            />
          </div>

          {/* Cart */}
          <Link to='cart' className="text-gray-600 hover:text-amber-400 z-10">
            <IoCartOutline className="h-6 w-6" />
          </Link>

          {/* User */}
          {user && !error ?  (
            <div>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-8 h-8 rounded-full bg-amber-400 text-gray-800 flex items-center justify-center border-2">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-amber-400"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-amber-400"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-2xl text-gray-600 hover:text-amber-400">
              <FaUserCircle />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
