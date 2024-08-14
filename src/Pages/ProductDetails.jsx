import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';


export const ProductDetails = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        axios.get(`http://localhost:3000/products/${id}`)
            .then(res => {
                const product = res.data;
                if (product) {
                    setData(product);
                    console.log(product)
                }
            })
            .catch(error => console.log(error));
    }, [id]);

    if (!data) {
        return <div className="text-center text-gray-700">Loading...</div>;
    }

    const HandleCart = async (item) => {

        const user = localStorage.getItem("id");
        if (user) {
            try {
                const res = await axios.get(`http://localhost:3000/users/${user}`);
                const currentCart = res.data.cart;
                const itemExists = currentCart.find(cartItem => cartItem.id === item.id);
                if (itemExists) {
                    toast.warn("item is already in the cart")
                    navigate('/cart')
                } else {
                    const updatedCart = [...currentCart, { ...item, quantity, totalPrice: (item.price * quantity) }]
                    await axios.patch(`http://localhost:3000/users/${user}`, { cart: updatedCart });
                    toast.success("item successfully added to cart");
                    navigate('/cart')
                }

            } catch (error) {
                toast.warn("Something went wrong");
                console.log(error);
            }
        } else {
            toast.warn("Please Login")
            navigate('/login')


        }

    };
    function handleIncrement() {
        setQuantity(quantity + 1)

    }
    function handleDecrement() {
        if (quantity > 1)
            setQuantity(quantity - 1)

    }

    return (
        <div className="max-w-full mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
            <div className="flex flex-col md:flex-row items-start w-full">
                <div className="image-container w-1/2 md:w-1/2 sm:1/3 mb-4 md:mb-0">
                    <img src={data.image} alt={data.name} className=" h-auto object-cover rounded-lg shadow-md ml-40" />
                </div>
                <div className="title-description w-full md:w-1/2 md:pl-6 mr-28">
                    <h1 className="text-2xl font-bold text-brown-700">{data.name}</h1>
                    <h3 className="text-lg text-brown-600">{data.type}</h3>
                    <p className="text-gray-700 mt-2">{data.description}</p>
                    <p ><span className='font-bold mr-1'>material:</span>{data.material}</p>
                    <p>
                        <ul className="list-none list-inside">
                            {Object.entries(data.dimensions).map(([key, value], index) => (
                                <li key={index}>
                                    {key}: {value}
                                </li>
                            ))}
                        </ul>
                    </p>
                    
                    <p ><span className='font-bold mr-1'>manufacturer:</span>{data.manufacturer}</p>
                    <p>
                        <span className='font-bold mr-1'>Colors:</span>
                        <ul className="list-none list-inside ">
                            {data.colors.map((color, index) => (
                                <li key={index}>{color}</li>
                            ))}
                        </ul>
                    </p>
<p ><span className='font-bold mr-1'>rating:</span>{data.rating}</p>
                    <p className='font-bold mr-1'>{data.availability}</p>




                    <div className="mt-4 w-full space-y-2 space-x-2">
                        <button onClick={handleIncrement}>+</button>
                        <button onClick={handleDecrement}>-</button>
                        <p>{quantity}</p></div>

                    <br></br>
                    <h1 className="text-lg text-brown-600">${data.price * quantity}</h1>
                    <div className="mt-4 w-full space-y-6 space-x-4">

                        <button onClick={() => HandleCart(data)} className="w-1/3 px-6 py-3 bg-white text-indigo-950 font-semibold rounded-lg border-2 border-indigo-950 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                            Add to Cart
                        </button>


                    </div>
                </div>
            </div>
        </div>
    );
};
