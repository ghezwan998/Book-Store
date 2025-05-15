import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/home/Home'
import Login from '../components/Login';
import Signup from '../components/Signup';
import About from '../components/About';
import Contact from '../components/Contact';
import BooksList from '../pages/book/BooksList';
import SingleBook from '../pages/book/SingleBook';
import CartPage from '../pages/book/CartPage';
import OrderPage from '../pages/book/OrderPage';
import StoreStatsPage from '../pages/dashboard/StoreStatsPage';
import BooksPage from '../pages/dashboard/books/BooksPage'
import AdminLogin from '../components/AdminLogin';
import Dashboard from '../pages/dashboard/dashboard';
import UsersPage from '../pages/dashboard/users/UsersPage';
import OrdersPage from '../pages/dashboard/OrdersPage';
import NewBook from '../pages/dashboard/books/NewBook';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/signup",
                element: <Signup/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "contact",
                element: <Contact/>
            },
            {
                path: "book-list",
                element: <BooksList/>
            },
            {
                path: "book-list/:id",
                element: <SingleBook/>
            },
            {
                path: 'cart',
                element: <CartPage/>
            },
            {
                path: 'order',
                element: <OrderPage/>
            },
            {
                path: 'admin',
                element: <AdminLogin/>
            }
        ],
    },
    {
        path: '/dashboard',
        element: <Dashboard/>,
        children: [
            {
                path: '',
                element: <StoreStatsPage/> 
            },
            {
                path: 'books',
                element: <BooksPage/>
            },
            {
                path: 'add-book',
                element: <NewBook/>
            },
            {
                path: 'users',
                element: <UsersPage/>
            },
            {
                path: 'orders',
                element: <OrdersPage/>
            }
        ]
    }
])

export default router;