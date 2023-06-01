import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// CSS library Bulma
import "bulma/css/bulma.min.css";

// pages
import Home from "./pages/Home";
import About from "./pages/About";
import Faq from "./pages/help/Faq";
import Contact, { contactAction } from "./pages/help/Contact";
import Login from "./pages/account/Login";
import Register from "./pages/account/Register";

import NotFound from "./pages/NotFound";
import Products, { productsLoader } from "./pages/products/Products";
import ProductsDetails, {
  productsDetailsLoader,
} from "./pages/products/ProductsDetails";
import ProductsError from "./pages/products/ProductsError";
import OrderHistory from "./pages/account/OrderHistory.js";
import Profile from "./pages/account/Profile.js";
import Cart, { cartProductsDetailsLoader } from "./pages/cart/Cart.js";

// layouts
import RootLayout from "./layouts/RootLayout";
import GeneralLayout from "./layouts/GeneralLayout";
import CartLayout from "./layouts/CartLayout";
import HelpLayout from "./layouts/HelpLayout";

// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import CheckoutFailure from "./pages/checkout/CheckoutSuccess";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route
        path="/products"
        element={<GeneralLayout />}
        errorElement={<ProductsError />}
      >
        <Route
          index
          element={<Products />}
          loader={productsLoader}
          errorElement={<ProductsError />}
        />
        <Route
          path=":id"
          element={<ProductsDetails />}
          loader={productsDetailsLoader}
          errorElement={<ProductsError />}
        />
      </Route>
      <Route element={<CartLayout />}>
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="success" element={<CheckoutSuccess />} />
        <Route path="failure" element={<CheckoutFailure />} />
      </Route>
      <Route element={<GeneralLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        <Route path="about" element={<About />} />
      </Route>
      <Route path="account" element={<GeneralLayout />}>
        <Route path="orders" element={<OrderHistory />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} action={contactAction} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
