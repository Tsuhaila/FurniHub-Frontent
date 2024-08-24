import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'


export const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState('')
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null)


    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get('http://localhost:3000/products')
                const filteredProducts = category ?
                    res.data.filter(data => data.category == category) :
                    res.data
                setProducts(filteredProducts)

            } catch (error) {
                console.log(error)
            }

        }
        fetchProducts()

    }, [category])

    async function handleDelete(item) {
        try {
            const updatedItems = products.filter((x) => x.id !== item.id)
            setProducts(updatedItems)
            await axios.delete(`http://localhost:3000/products/${item.id}`)
            toast.success('Product deleted successfully')
        } catch (error) {
            console.log(error)
            toast.warn('failed to delete product. please try again')
        }

    }
    async function handleSearch(e) {
        const query = e.target.value;
        setSearchQuery(query);
        if (!query) {

            return;
        }
        e.preventDefault();

        try {
            const result = await axios.get("http://localhost:3000/products");
            const combinedResult = result.data;
            const filteredResult = combinedResult.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setProducts(filteredResult)
        } catch (error) {
            console.log(error);
        }
    }

    const handleDetails = (item) => {
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
                            className="block w-full p-2.5 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-sm hover:bg-gray-200 transition-colors duration-200 ease-in-out cursor-pointer"
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

                        </tr>
                    </thead>
                    <tbody>
                        {products.map(item => (
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
                                {selectedProduct.material && (
                                <p>
                                    <span className="font-bold">Material:</span> {selectedProduct.material}
                                </p>
                                )}
                                {selectedProduct.manufacturer && (
                                    <p>
                                        <span className="font-bold">Manufacturer:</span> {selectedProduct.manufacturer}
                                    </p>
                                )}
                                {selectedProduct.colors && (
                                    <p>
                                        <span className="font-bold">Colors:</span>
                                        <ul>
                                            {selectedProduct.colors.map((color, index) => (
                                                <li key={index}>{color}</li>
                                            ))}
                                        </ul>
                                    </p>
                                )}
                                <p>
                                    <span className="font-bold">Features:</span>
                                    {selectedProduct.features?.length > 0 ? (
                                        <ul>
                                            {selectedProduct.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <span>No features available.</span>
                                    )}
                                </p>
                                {selectedProduct.rating &&(
                                <p>
                                    <span className="font-bold">Rating:</span> {selectedProduct.rating}
                                </p>
                )}
                                {selectedProduct.reviews && (
                                    <p>
                                        <span className="font-bold">Reviews:</span> {selectedProduct.reviews}
                                    </p>
                                )}
                              
                                <br></br>
                                {selectedProduct.price &&(
                                <p>
                                    <span className="font-bold">${selectedProduct.price}</span>
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

