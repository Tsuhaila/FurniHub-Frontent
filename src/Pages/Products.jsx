import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export const Products = () => {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const category = searchParams.get('category');

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get("http://localhost:3000/products");
                const filteredProducts = res.data.filter(data => data.category === category);
                setProducts(filteredProducts);
            } catch (error) {
                console.log('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, [category]);

    return (
        <section className="bg-gray-100 py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{category}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product, index) => (
                        <Link to={`/products/${product.id}`} key={index}>
                            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-t-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                                {/* <p className="text-gray-600 mt-2">{product.description}</p> */}
                                <p>
                                    <span className="font-bold mr-1">Material:</span>
                                    {product.material}
                                </p>
                                <p className="font-bold mr-1">{product.availability}</p>
                                <p className="text-gray-800 font-bold mt-4">${product.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
