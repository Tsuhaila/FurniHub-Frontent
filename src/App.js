import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './Pages/Home';
import { ContactUs } from './Pages/ContactUs';
import Login from './Pages/Login';
import { SignUp } from './Pages/SignUp';
import { Navbar } from './Pages/Navbar';
import { Products } from './Pages/Products';
import { Furniture } from './Pages/Furniture';
import { Sofas } from './Pages/Sofas';
import { ProductSofas } from './Pages/ProductSofas';
import { DetailsOfSofas } from './Pages/DetailsOfSofas';
import { Beds } from './Pages/Beds';

function App() {
  const location = useLocation();
  const shouldHideNavbar = location.pathname === '/login'||location.pathname === '/signup';

  return (
    <div>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/products' element={<Products />} />
        <Route path='/furniture' element={<Furniture />} />
        <Route path='/sofas' element={<Sofas />} />
        <Route path='/ProductSofas' element={<ProductSofas />} />
        <Route path='/sofas/:id' element={<DetailsOfSofas />} />
        <Route path='/beds' element={<Beds />} />
      </Routes>
    </div>
  );
}

export default App;
