import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProductsList from './pages/customer/product/Products.jsx';
import ExamplesAdminPage from './pages/admin/example/Example.jsx';
import PrivateRoute from './components/privateRoute/PrivateRoute.jsx';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/customer/login/Login.jsx';
import SignupPage from './pages/customer/signup/Signup.jsx';
import NotFoundPage from './pages/customer/notFound/NotFound.jsx';
import Layout from "./components/layout/Layout.jsx";
import AdminRoute from './components/adminRoute/AdminRoute.jsx';
import Cart from './pages/customer/cart/Cart.jsx';
import CategoryAdminPage from './pages/admin/category/category.jsx';
import ProductAdminPage from './pages/admin/product/Product.jsx';
import UserAdminPage from './pages/admin/user/User.jsx';
import CommandeAminPage from './pages/admin/commande/Commande.jsx';
import { getCurrentUser } from './redux/auth/auth.slice.js';
import Paiement from './pages/customer/paiment/paiement.jsx';

function App() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.auth.isAdmin);

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser());
    }
  }, [token, dispatch]);

  return (
    <div className="App">
      <Routes>
        {/* Private Routes */}
        <Route path="/" element={
          <PrivateRoute >
            <Layout />
          </PrivateRoute>
        }>
          <Route path="/" element={<ProductsList />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/my-orders" element={<CommandeAminPage />} />
          <Route path="/shop" element={<Cart  />} />
          <Route path="/paiement" element={<Paiement  />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={
          <AdminRoute isAdmin={isAdmin}>
            <Layout />
          </AdminRoute>
        }>
          <Route path="examples" element={<ExamplesAdminPage />} />
          <Route path="categories" element={<CategoryAdminPage />} />
          <Route path="products" element={<ProductAdminPage />} />
          <Route path="users" element={<UserAdminPage />} />
          <Route path="orders" element={<CommandeAminPage />} />
        </Route>

        {/* Public Routes */}
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
