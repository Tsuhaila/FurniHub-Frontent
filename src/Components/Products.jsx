import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Products = () => {
  
    const [products, setProducts] = useState([]);
    const [category, setCategory] =useState()

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get("http://localhost:3000/products");
                const filteredProducts = res.data.filter(data => data.category === category);
                console.log(res.data)
                setProducts(filteredProducts.length > 0 ? filteredProducts : res.data);
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [category]);

    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{category ? category : "All Products"}</h2>
                <div className='w-full max-w-xs mx-auto mb-10'>
                    <label htmlFor="category-select" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Select Category
                    </label>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        id="category-select"
                        name="category"
                        className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm hover:bg-gray-200 transition-colors duration-200 ease-in-out cursor-pointer"
                    >
                        <option value="">All Categories</option>
                        <option>Sofas</option>
                        <option>Beds</option>
                        <option>Tables</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              
                    {products.map((product, index) => (
                        <Link to={`/products/${product.id}`} key={index}>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                                />
                                <h3 className="text-lg font-bold text-gray-700">{product.name}</h3>

                                <p>
                                    <span className="font-semibold mr-1">Material:</span>
                                    {product.material}
                                </p>
                                <p>
                                    <span className="font-semibold mr-1">Rating:</span>
                                    {product.rating}
                                </p>
                                <p className="text-gray-800 font-bold mt-4">${product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
