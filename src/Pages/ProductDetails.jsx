import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cartContext } from '../Context/CartProvider';


export const ProductDetails = () => {
   
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [quantity, setQuantity] = useState(1)
    const { AddToCart } = useContext(cartContext)

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => {
                const product = res.data;
                if (product) {
                    setData(product);

                }
            })
            .catch(error => console.log(error));
    }, [id]);

    if (!data) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }

    function handleIncrement() {
        setQuantity(quantity + 1)

    }
    function handleDecrement() {
        if (quantity > 1)
            setQuantity(quantity - 1)

    }
console.log(data.dimensions);

    return (
        <div className="max-w-5/6 mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
            <div className="flex flex-col md:flex-row items-start w-5/6">
                <div className="image-container w-5/6 md:w-1/2 sm:w-1/3 mb-4 md:mb-0 flex justify-center">
                    <img
                        src={data.image}
                        alt={data.name}
                        className="h-auto object-cover rounded-lg shadow-md w-4/5 md:w-full"
                    />
                </div>
                <div className="title-description w-full md:w-1/2 md:pl-6">
                    <h1 className="text-2xl font-bold text-brown-700">{data.name}</h1>
                    <h3 className="text-lg text-brown-600">{data.type}</h3>
                    <p className="text-gray-700 mt-2">{data.description}</p>
                    <p>
                        <span className="font-bold mr-1">Material:</span>
                        {data.material}
                    </p>
                    <p>
                    {data && data.dimensions &&    <ul className="list-none list-inside">
                            {Object.entries(data.dimensions).map(([key, value], index) => (
                                <li key={index}>
                                    {key}: {value}
                                </li>
                            ))}
                        </ul>}
                    </p>
                    <p>
                        <span className="font-bold mr-1">Manufacturer:</span>
                        {data.manufacturer}
                    </p>
                    <p>
                        <span className="font-bold mr-1">Colors:</span>
                        <ul className="list-none list-inside">
                            {data.colors.map((color, index) => (
                                <li key={index}>{color}</li>
                            ))}
                        </ul>
                    </p>
                    <p>
                        <span className="font-bold mr-1">Rating:</span>
                        {data.rating}
                    </p>
                    <p>
                        <span className="font-bold mr-1">Reviews:</span>
                        {data.reviews}
                    </p>
                  

                    <div className="mt-4 w-full flex items-center space-x-4">
                        <button
                            onClick={handleDecrement}
                            className="px-2 py-1 bg-gray-200 rounded"
                        >
                            -
                        </button>
                        <p className="font-semibold">{quantity}</p>
                        <button
                            onClick={handleIncrement}
                            className="px-2 py-1 bg-gray-200 rounded"
                        >
                            +
                        </button>


                    </div>

                    <h1 className="text-lg text-brown-600 mt-4">${data.price * quantity}</h1>

                    <div className="mt-4 w-full">
                        <button
                            onClick={() => AddToCart(data, quantity)}
                            className="w-full md:w-1/3 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border-2 border-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-800"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};
