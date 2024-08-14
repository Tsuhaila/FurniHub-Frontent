import React from 'react';
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



function App() {
  const location = useLocation();
  const shouldHideNavbar = location.pathname === '/login' || location.pathname === '/signup';

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



      </Routes>



      {!shouldHideNavbar && <Footer />}

    </div>
  );
}

export default App;
