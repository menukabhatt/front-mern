import { createBrowserRouter, RouterProvider } from "react-router-dom"
import RootLayout from "./ui/RootLayout";
import ProductList from "./features/product/ProductList";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import AllProducts from "./features/product/AllProducts";
import ProductForm from "./features/product/ProductForm";
import ProductEdit from "./features/product/ProductEdit";
import ProductDetail from "./features/product/ProductDetail";
import SearchPage from "./features/search/SearchPage";
import UserProfile from "./features/auth/UserProfile";
import CartPage from "./features/carts/CartPage";
import OrderDetail from "./features/order/OrderDetail";
const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <ProductList />
        },

        {
          path: 'search/:search',
          element: <SearchPage />
        },
        {
          path: '/user-profile',
          element: <UserProfile />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'register',
          element: <Register />
        },

        {
          path: 'products',
          element: <AllProducts />
        },
        {
          path: 'cart-page',
          element: <CartPage />
        },
        {
          path: 'product-edit/:id',
          element: <ProductEdit />
        },
        {
          path: 'product-detail/:id',
          element: <ProductDetail />
        },
        {
          path: 'product-form',
          element: <ProductForm />
        },

        {
          path: '/order-detail/:id',
          element: <OrderDetail />
        }


      ]
    }
  ]);

  return <RouterProvider router={router} />
}
export default App