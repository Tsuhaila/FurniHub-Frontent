import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import Home from './Pages/Home';
import { Contact } from './Pages/Contact'
import Login from './Pages/Login';
import { SignUp } from './Pages/SignUp';
import { Navbar } from './Pages/Navbar';
import { Products } from './Pages/Products';
import { Cart } from './Cart/Cart';
import { Footer } from './Components/Footer.jsx';
import { About } from './Pages/About.jsx';
import ShopPage from './Pages/ShopPage.jsx';
import { PlaceOrder } from './Cart/PlaceOrder.jsx';
import { ProductDetails } from './Pages/ProductDetails.jsx';
import { Search } from './Pages/Search.jsx';
import { createContext } from 'react';
import { cartContext } from './Context/CartProvider.jsx';
import { Orders } from './Pages/Orders.jsx';




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
