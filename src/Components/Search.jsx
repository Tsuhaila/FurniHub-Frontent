import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Search = () => {
    const { state } = useLocation()
    const { results } = state
    const navigate = useNavigate()
    console.log(results);


    function handleClick(item) {
        console.log(item)
        navigate(`/products/${item.id}`)
    }

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Search Results</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results?.map((item) => (
                    <li
                        key={item.id}
                        className="bg-white rounded-lg shadow-lg p-4 transition-transform transform hover:scale-105"
                    >
                        <img
                            alt={item.name}
                            src={item.image}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                            <div className="flex items-center mb-4">
                                <span className="text-lg text-gray-500 line-through mr-2">
                                    ${item.price}
                                </span>
                                <span className="text-xl font-semibold text-red-600">
                                    ${item.offerPrice}
                                </span>
                            </div>
                            <button
                                onClick={() => handleClick(item)}
                                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                            >
                                SEE MORE
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

