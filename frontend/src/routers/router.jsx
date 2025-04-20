import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import SpecialEditions from '../pages/home/SpecialEditions';
import SingleSpecialEdition from '../pages/books/SingleSpecialEdition';
import OrderPage from "../pages/books/OrderPage";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageBooks/ManageBooks";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import UserDashboard from "../pages/dashboard/users/UserDashboard";
import AddSpecialEdition from "../pages/dashboard/addBook/AddSpecialEdition";
import ManageSpecialEdition from "../pages/dashboard/manageBooks/ManageSpecialEdition";
import EditSpecialEdition from "../pages/dashboard/EditBook/EditSpecialEdition";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

import NFTDetails from "../components/nftDetails";
import NFTBooks from "../components/NFTBooks";
import Fantasy from "../pages/Genres/FantasyFinal";
import Romance from "../pages/Genres/Romance";
import Dystopian from "../pages/Genres/Dystopian";
import Thriller from "../pages/Genres/ThrillerNew";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "nft-books", element: <NFTBooks /> }, 
      { path: "orders", element: <PrivateRoute><OrderPage /></PrivateRoute> },
      { path: "about", element: <div>About</div> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <PrivateRoute><CheckoutPage /></PrivateRoute> },

      {path: "special-editions", element: <SpecialEditions />} ,
      {path: "special-editions/:id", element:<SingleSpecialEdition />},
      {path: "/nft/:id", element:<NFTDetails />} ,    
      { path: "books/:id", element: <SingleBook /> },
      { path: "user-dashboard", element: <PrivateRoute><UserDashboard /></PrivateRoute> },
      { path: "dystopian", element: <Dystopian /> },
      { path: "fantasy", element: <Fantasy /> },
      { path: "romance", element: <Romance /> },
      { path: "thriller", element: <Thriller /> },
    ]
  },
  { path: "/admin", element: <AdminLogin /> },

  {
    path: "/dashboard",
    element: <AdminRoute><DashboardLayout /></AdminRoute>,
    children: [
      { path: "", element: <AdminRoute><Dashboard /></AdminRoute> },
      
      // Normal Books
      { path: "add-new-book", element: <AdminRoute><AddBook /></AdminRoute> },
      { path: "edit-book/:id", element: <AdminRoute><UpdateBook /></AdminRoute> },
      { path: "manage-books", element: <AdminRoute><ManageBooks /></AdminRoute> },
  
      // Special Edition Books
      { path: "add-special-edition", element: <AdminRoute><AddSpecialEdition /></AdminRoute> },
      { path: "edit-special-edition/:id", element: <AdminRoute><EditSpecialEdition /></AdminRoute> },
      { path: "manage-special-editions", element: <AdminRoute><ManageSpecialEdition /></AdminRoute> },
    ]
  }
  
]);

export default router;






























/*import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";   // Import pages
import Orders from "../pages/Orders";
import About from "../pages/About";
import Cart from "../components/Cart";
import Fantasy from "../pages/Fantasy"; // Import pages
import Romance from "../pages/Romance"; // Import pages
import Dystopian from "../pages/Dystopian"; 
import Thriller from "../pages/Thriller";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      { path: "/", element: <Home /> },  // Home page with Hero & Genre Grid
      { path: "/dystopian", element: <Dystopian /> },  // Dystopian Page
      { path: "/fantasy", element: <Fantasy /> },  // Fantasy Page
      { path: "/romance", element: <Romance /> },  // Romance Page
      { path: "/thriller", element: <Thriller />},
      { path: "/orders", element: <Orders /> },
      { path: "/about", element: <About /> },
    ],
  },
]);

*/