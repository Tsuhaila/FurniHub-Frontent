import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import Home from './Pages/Home';
import { Contact } from './Components/Contact.jsx';
import Login from './Pages/Login';
import { SignUp } from './Pages/SignUp';
import { Navbar } from './Components/Navbar.jsx';
import { Products } from './Components/Products.jsx';
import { Cart } from './Cart/Cart.jsx';
import { Footer } from './Components/Footer.jsx';
import { About } from './Components/About.jsx';
import ShopPage from './Components/ShopPage.jsx';
import { PlaceOrder } from './Cart/PlaceOrder.jsx';
import { ProductDetails } from './Components/ProductDetails.jsx';
import { Search } from './Components/Search.jsx';
import { cartContext } from './Context/CartProvider.jsx';
import { Orders } from './Components/Orders.jsx';




function App() {
  const location = useLocation();
  const shouldHideNavbar = location.pathname === '/login' || location.pathname === '/signup';
  const {FetchCart} = useContext(cartContext)

  useEffect(() => {
    FetchCart()
  },[])

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/products' element={<Products />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/shoppage' element={<ShopPage />} />
        <Route path='/about' element={<About />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/products/:id' element={<ProductDetails />} />
        <Route path='search' element={<Search/>}/>
        <Route path='/orders' element={<Orders/>}/>
      </Routes>



      {!shouldHideNavbar && <Footer />}

    </div>
  );
}

export default App;
