import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Sofas',
 
    image: 'https://ii1.pepperfry.com/media/catalog/product/b/i/494x544/bingo-fabric-lhs-6-seater-sectional-sofa-in-creamy-cashmere-colour-bingo-fabric-lhs-6-seater-section-fkngvx.jpg',
    link:'/products?category=Sofas'
  },
  {
    id: 2,
    name: 'Beds',

    image: 'https://ii1.pepperfry.com/media/catalog/product/j/a/494x544/jacklin-king-size-bed-in-cream-colour-by-durian-jacklin-king-size-bed-in-cream-colour-by-durian-dalq6a.jpg',
    link:'/products?category=Beds'
  },
  {
    id: 3,
    name: 'Tables',
 
    image: 'https://ii1.pepperfry.com/media/catalog/product/e/l/494x544/electra-end-table-in-choco-walnut-finish-electra-end-table-in-choco-walnut-finish-xkaehz.jpg',
    link:'/products?category=Tables'
  },
  // {
  //   id: 4,
  //   name: 'Bookshelf',
  
  //   image: 'https://ii1.pepperfry.com/media/catalog/product/c/h/494x544/checkers-5-tire-bookshelf-in-classic-walnut-finish-by--home-checkers-5-tire-bookshelf-in-classic-wal-kjkepa.jpg',
  //   link:'/sofas'
  // },
  // Add more products here
];

const ShopPage = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Shop Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
             
             <Link to={product.link}><button className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition duration-300">
                View Details
              </button></Link> 
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
