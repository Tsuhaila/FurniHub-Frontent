import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToCart } from '../Redux/Slices/CartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


export const ProductDetails = () => {

    const { id } = useParams();
    const [data, setData] = useState(null);
    const dispatch = useDispatch()


    const admin = localStorage.getItem("admin")
    const baseUrl = process.env.REACT_APP_BASE_URL

    useEffect(() => {
        axios.get(baseUrl + `/products/${id}`)
            .then(res => {
                const product = res.data;
                if (product) {
                    setData(product.result);

                }
            })
            .catch(error => console.log(error));
    }, [id]);

    if (!data) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }


    return (
        <div className="w-4/6 mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
            <div className="flex flex-col md:flex-row items-start w-5/6">
                <div className="image-container w-max md:w-5/6  mb-4 md:mb-0 flex justify-center">
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
                        <h1 className="text-2xl font-bold text-brown-700 mt-20">{data.name}</h1>
                    )}
                    {data.category && (
                        <h3 className="text-lg text-brown-600 mt-4">{data.category}</h3>
                    )}
                    {data.description && (
                        <p className="text-gray-700 mt-2">{data.description}</p>
                    )}
                
                    <div className="flex items-center mb-4 mt-5">
                            <span className="text-lg text-gray-500 line-through mr-2">
                                ${data.price}
                            </span>
                            <span className="text-xl font-semibold text-red-600">
                                ${data.offerPrice}
                            </span>
                        </div>

                  

                    <div className="mt-4 w-full">
                        <button
                            disabled={admin ? true : false}
                            onClick={() =>{
                                if(data.quantity<1){
                                    toast.warn("out of stock")
                                }else{
                                    dispatch(addToCart(data.id))
                                }
                                                           }
                            }
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
