import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

// pages
import Home from './pages/Home'
import About from './pages/About'
import Faq from './pages/help/Faq'
import Contact, { contactAction } from './pages/help/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Products, { productsLoader } from './pages/products/Products'
import ProductsDetails, { productsDetailsLoader } from "./pages/products/ProductsDetails"
import ProductsError from './pages/products/ProductsError'

// layouts
import RootLayout from './layouts/RootLayout'
import HelpLayout from './layouts/HelpLayout'
import ProductsLayout from './layouts/ProductsLayout'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="help" element={<HelpLayout />}>
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact/>} action={contactAction} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="account" element={<Account />} />
      <Route path="cart" element={<Cart />} />
      <Route path="products" element={<ProductsLayout />} errorElement={<ProductsError />}>
        <Route 
          index 
          element={<Products />} 
          loader={productsLoader}
          // errorElement={<ProductsError />}
        />
        <Route 
          path=":id" 
          element={<ProductsDetails />}
          loader={productsDetailsLoader}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
