import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaArrowRight } from "react-icons/fa";
import { useSearchParams } from 'react-router-dom';

export const Products = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const category = searchParams.get('category');

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get("http://localhost:3000/products");
                const filteredProducts = res.data.filter(data => data.category === category);
                setProducts(filteredProducts);
                setOriginalProducts(filteredProducts); 
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [category]);

    function handleSearch(e) {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = originalProducts.filter(item => 
            item.name.toLowerCase().includes(searchTerm)
        );
        setProducts(filtered);
    }

    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{category}</h2>
                <div className="flex justify-center mb-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        onChange={handleSearch}
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <Link to={`/products/${product.id}`} key={index}>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                                <p className="text-gray-600 mt-2">{product.description}</p>
                                <p className="text-gray-800 font-bold mt-4">${product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
