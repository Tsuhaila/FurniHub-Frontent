import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProduct, fetchProductByCategory, fetchProducts, searchProducts } from '../../Redux/Slices/ProductSlice'


export const AllProducts = () => {
    const [category, setCategory] = useState('')
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null)
    const { products } = useSelector(state => state.product)
    console.log('all', products);

    const dispatch = useDispatch()
    useEffect(() => {
        if (category) {
            dispatch(fetchProductByCategory(category))
        } else if(searchQuery){
            dispatch(searchProducts(searchQuery))
        }else{
            dispatch(fetchProducts())
        }

    }, [category, dispatch,searchQuery])

    async function handleDelete(id) {
        dispatch(deleteProduct(id))

    }
    async function handleSearch(e) {
        const query = e.target.value;
        setSearchQuery(query)   
    }

    const handleDetails = (item) => {
        console.log(item)
        setSelectedProduct(item)
    }

    const closeModal = () => {
        setSelectedProduct(null)
    }

    return (
        <div>
            <div className="relative overflow-x-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{category ? category : "All Products"}</h2>

                <div className="flex flex-col md:flex-row gap-5 md:justify-between items-center mb-8 mr-2">
                    <div className="w-full max-w-xs">
                        <label
                            htmlFor="category-select"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Select Category
                        </label>
                        <select
                            onChange={(e) => setCategory(e.target.value)}
                            id="category-select"
                            name="category"
                            className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs"
                        >
                            <option value="">All Categories</option>
                            <option>Sofas</option>
                            <option>Beds</option>
                            <option>Tables</option>
                        </select>
                    </div>

                    <div className="w-full max-w-sm">
                        <input
                            type="text"
                            placeholder="Search products..."
                            onChange={handleSearch}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
                        />
                    </div>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                image
                            </th>
                            <th scope="col" class="px-6 py-3">
                                price
                            </th>
                            <th scope="col" class="px-6 py-3">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map(item => (
                            <tr key={item.id} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.id}
                                </th>
                                <td onClick={() => handleDetails(item)} className="px-6 py-4 cursor-pointer hover:underline">
                                    {item.name}
                                </td>
                                <td class="px-6 py-4">
                                    <img src={item.image} alt={item.name} class="w-20 h-20 object-cover"></img>

                                </td>
                                <td class="px-6 py-4">
                                    {item.price}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link to={`${item.id}`}>
                                        <button className="text-blue-600 hover:text-blue-800 font-semibold mr-4">
                                            Edit
                                        </button>
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="text-red-600 hover:text-red-800 font-semibold"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
                {selectedProduct && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                        <div className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-lg shadow-lg max-w-2xl">
                            {selectedProduct.image && (
                                <img
                                    className="object-cover w-full h-64 md:w-1/2 md:h-auto rounded-t-lg md:rounded-l-lg"
                                    src={selectedProduct.image}
                                    alt={selectedProduct.name}
                                />
                            )}
                            <div className="flex flex-col flex-grow p-4">
                                {selectedProduct.name && (
                                    <h5 className="mb-2 text-2xl font-bold text-gray-900">
                                        {selectedProduct.name}
                                    </h5>
                                )}
                                {selectedProduct.description && (
                                    <p className="mb-3 text-gray-700">
                                        {selectedProduct.description}
                                    </p>
                                )}
                                {selectedProduct.category && (
                                    <p>
                                        <span className="font-bold">category:</span> {selectedProduct.category}
                                    </p>
                                )}
                              
                                {selectedProduct.price && (
                                    <p>
                                        <span className="font-bold">price:$</span> {selectedProduct.price}
                                    </p>
                                )}


                                {selectedProduct.offerPrice && (
                                    <p>
                                        <span className="font-bold">offer price:$</span> {selectedProduct.offerPrice}
                                    </p>
                                )}
                                <div className="mt-auto flex justify-end">
                                    <button
                                        onClick={closeModal}
                                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

