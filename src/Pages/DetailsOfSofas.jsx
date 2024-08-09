import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const DetailsOfSofas = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3000/Sofas/${id}`)
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

    return (
        <div className="max-w-full mx-auto p-4 bg-white shadow-lg rounded-lg mt-10">
            <div className="flex flex-col md:flex-row items-start w-full">
                <div className="image-container w-full md:w-1/2 mb-4 md:mb-0">
                    <img src={data.image} alt={data.name} className=" h-auto object-cover rounded-lg shadow-md ml-40" />
                </div>
                <div className="title-description w-full md:w-1/2 md:pl-6 mr-28">
                    <h1 className="text-2xl font-bold text-brown-700">{data.name}</h1>
                    <h3 className="text-lg text-brown-600">{data.type}</h3>
                    <p className="text-gray-700 mt-2">{data.description}</p>
                    
                    <div className="mt-4 w-full space-y-6 space-x-4">
                    <button className="w-1/3 px-6 py-3 bg-indigo-950 text-white font-semibold rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500">
    Buy Now
</button>
<button className="w-1/3 px-6 py-3 bg-white text-indigo-950 font-semibold rounded-lg border-2 border-indigo-950 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
    Add to Cart
</button>


                    </div>
                </div>
            </div>
        </div>
    );
};
