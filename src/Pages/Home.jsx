import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Assets/home_Edited.jpg';
import { Products } from './Products';
import { ProductSofas } from './ProductSofas';
import { Furniture } from './Furniture';

export const Home = () => {
  return (
    <div>
     
      <div
        className="relative flex items-start justify-start h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${Image})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> 
        <div className="relative z-10 p-8 mt-24 ml-16"> 
          <h1 className="text-7xl font-bold text-white mb-4">LUXURY <br></br>FURNITURE</h1>
          <p className="text-lg text-white mb-8">
            Discover our range of high-end furniture for your home.
          </p>

         
          <div className="space-x-4">
           
            <Link to={'/furniture'}><button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300">
              GO TO SHOP
            </button></Link>
          
            <button className="bg-white text-orange-500 py-2 px-4 rounded-lg border-2 border-orange-500 hover:bg-orange-500 hover:text-white transition duration-300">
          SEE COLLECTION
            </button>
          </div>
        </div>
      </div>

     
      <div className="w-full">
        <div>
        <Furniture/>

        </div>
       
      
        {/* <ProductSofas/> */}
      </div>
    </div>
  );
};


