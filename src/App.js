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
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/account/Account";

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
import HelpLayout from "./layouts/HelpLayout";
import ProductsLayout from "./layouts/ProductsLayout";
import AccountLayout from "./layouts/AccountLayout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import CheckoutFailure from "./pages/checkout/CheckoutSuccess";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route
        path="products"
        element={<ProductsLayout />}
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
        />
      </Route>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="account" element={<AccountLayout />}>
        <Route path="orders" element={<OrderHistory />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="about" element={<About />} />
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} action={contactAction} />
      </Route>
      <Route path="cart" element={<Cart />} />
      <Route path="checkout" element={<Checkout />}>
        <Route path="success" element={<CheckoutSuccess />} />
        <Route path="failure" element={<CheckoutFailure />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
const stripePromise = loadStripe(
  "pk_test_51N8n2ODvHmrdraF8Eb3aQ9m86ueHPsypNotvydB9gIsrlxlpyVbah3R3Zt0L1Al5swbbXNzkDHmUmfXuKjH70fmc00Q2jPmqAa"
);

function App() {
  const options = {
    // passing the client secret obtained from the server
    mode: "payment",
    currency: "usd",
    amount: 100,
  };
  return (
    <Elements stripe={stripePromise} options={options}>
      <RouterProvider router={router} />
    </Elements>
  );
}

export default App;
