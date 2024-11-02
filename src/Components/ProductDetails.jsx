import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart } from '../Redux/Slices/CartSlice';
import { useDispatch } from 'react-redux';


export const ProductDetails = () => {
   
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [quantity, setQuantity] = useState(1)
    const dispatch=useDispatch()
   

    const admin=localStorage.getItem("admin")
    const baseUrl=process.env.REACT_APP_BASE_URL

    useEffect(() => {
        axios.get(baseUrl+`/products/${id}`)
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


    return (
        <div className="w-4/6 mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex flex-col md:flex-row items-start w-5/6">
            <div className="image-container w-[100%] md:w-5/6  mb-4 md:mb-0 flex justify-center">
            {data.image && (
                <img
                    src={data.image}
                    alt={data.name}
                    className="h-auto object-cover rounded-lg shadow-md w-4/5 md:w-full"
                />
            )}
            </div>
            <div className="title-description w-full md:w-1/2 md:pl-6">
            {data.name && (
                <h1 className="text-2xl font-bold text-brown-700">{data.name}</h1>
            )}
             {data.type && (
                <h3 className="text-lg text-brown-600">{data.type}</h3>
             )}
              {data.description && (
                <p className="text-gray-700 mt-2">{data.description}</p>
              )}
                {data.material && (
                <p>
                    <span className="font-bold mr-1">Material:</span>
                    {data.material}
                </p>
                )}
               
                {data && data.manufacture && <p>
                
                    <span className="font-bold mr-1">Manufacturer:</span>
                    {data.manufacturer}
                </p>}
                {data && data.colors &&<p>
                    <span className="font-bold mr-1">Colors:</span>
                    <ul className="list-none list-inside">
                        {data.colors.map((color, index) => (
                            <li key={index}>{color}</li>
                        ))}
                    </ul>
                </p>}
        
                {data && data.features &&<p>
                    <span className="font-bold mr-1">Features:</span>
                    <ul className="list-none list-inside">
                        {data.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                </p>}
                
                
                <p>
                    <span className="font-bold mr-1">Rating:</span>
                    {data.rating}
                </p>
                {data && data.reviews &&<p>
                    <span className="font-bold mr-1">Reviews:</span>
                    {data.reviews}
                    </p>}
              
        
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
                    disabled={admin ? true : false }
                        onClick={() => dispatch(addToCart(data.id))}
                        className="w-full md:w-2/3 text-black py-2 px-6 rounded-lg border-2 border-black hover:bg-black hover:text-white transition duration-300"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};
