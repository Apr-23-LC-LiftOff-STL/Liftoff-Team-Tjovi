import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// CSS library Bulma
import "bulma/css/bulma.min.css";

// pages
import About from "./pages/About";
import Cart from "./pages/cart/Cart.js";
import Checkout from "./pages/checkout/Checkout";
import CheckoutDEPLOY from "./pages/checkout/CheckoutDEPLOY";
import CheckoutFailure from "./pages/checkout/CheckoutSuccess";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import Contact, { contactAction } from "./pages/help/Contact";
import Faq from "./pages/help/Faq";
import Home from "./pages/Home";
import Login from "./pages/account/Login";
import NotFound from "./pages/NotFound";
import OrderHistory from "./pages/account/OrderHistory.js";
import OrderHistoryAdmin from "./pages/account/OrderHistoryAdmin.js";
import Products, { productsLoader } from "./pages/products/Products";
import ProductsAdmin, {
  productsLoaderAdmin,
} from "./pages/products/ProductsAdmin";
/* import ProductDetailsPage, {
  productDetailsLoader,
} from "./pages/products/ProductDetailsPage"; */
import ProductDetailsPageAdmin, {
  productDetailsLoaderAdmin,
} from "./pages/products/ProductDetailsPageAdmin";
import ProductsError from "./pages/products/ProductsError";
import Profile from "./pages/account/Profile.js";
import Register from "./pages/account/Register";

// layouts
import RootLayout from "./layouts/RootLayout";
import GeneralLayout from "./layouts/GeneralLayout";
import CartLayout from "./layouts/CartLayout";
import HelpLayout from "./layouts/HelpLayout";
import AdminLayout from "./layouts/AdminLayout";
import LostPassword from "./pages/account/LostPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
{/*       <Route
        index
        element={<Products />}
        loader={productsLoader}
        errorElement={<ProductsError />}
      />
      <Route
        path="products/:id"
        element={<ProductDetailsPage />}
        loader={productDetailsLoader}
        errorElement={<ProductsError />}
      /> */}
      <Route element={<CartLayout />}>
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<CheckoutDEPLOY />} />
        <Route path="success" element={<CheckoutSuccess />} />
        <Route path="failure" element={<CheckoutFailure />} />
      </Route>
      <Route element={<GeneralLayout />}>
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="account" element={<GeneralLayout />}>
        <Route path="orders" element={<OrderHistory />} />
        <Route path="profile" element={<Profile />} />
        <Route path="lostPassword" element={<LostPassword />} />
      </Route>
      <Route element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route
          path="contact"
          element={<Contact />} /* action={contactAction} */
        />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="orders" element={<OrderHistoryAdmin />} />
        <Route
          path="products"
          element={<ProductsAdmin />}
          loader={productsLoaderAdmin}
          errorElement={<ProductsError />}
        />
        <Route
          path="products/:id"
          element={<ProductDetailsPageAdmin />}
          loader={productDetailsLoaderAdmin}
          errorElement={<ProductsError />}
        />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
