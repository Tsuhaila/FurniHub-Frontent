import React from 'react'
import { useLocation } from 'react-router-dom'

export const Search = () => {
    const { state } = useLocation()
    const { results } = state
    
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-8">Search Results</h1>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {results.map((item) => (
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
                            <p className="text-gray-600 mb-4">{item.description}</p>
                            <h2 className="text-xl font-semibold mb-2">${item.price}</h2>
                           
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

