'use client'

import { getProduct } from "@/action/get-product";
import { IProduct } from "@/model/product";
import { useEffect, useState } from "react"


function Product() {

    const id = '1';

    const [productDetail, setProductDetail] = useState<IProduct | null>(null);

    const handleGetProduct = async (id: string) => {
        try {
            const data = await getProduct(id);
            setProductDetail(data);
        } catch (error) {

        }
    }

    useEffect(() => {
        handleGetProduct(id)
    })

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <img
                            src={productDetail?.image}
                            alt="Product"
                            className="w-3/4 mx-auto h-auto rounded-lg shadow-md mb-4"
                            id="mainImage"
                        />
                    </div>

                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl font-bold mb-2">{productDetail?.title}</h2>
                        <p className="text-gray-600 mb-4">{productDetail?.category}</p>
                        <div className="mb-4">
                            <span className="text-2xl font-bold mr-2">${productDetail?.price}</span>
                            <span className="text-gray-500 line-through">
                                {/* ${(product.price * 1.5).toFixed(2)} */}
                            </span>
                        </div>
                        <div className="flex items-center mb-4">
                            <span className="ml-2 text-gray-600">
                                {productDetail?.rating.rate} ({productDetail?.rating.count})
                            </span>
                        </div>
                        <p className="text-gray-700 mb-6">{productDetail?.description}</p>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Color:</h3>
                            <div className="flex space-x-2">
                                <button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                                <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                                <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                                Quantity:
                            </label>
                            {/* <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                className="block w-20 p-2 border rounded-md"
                            /> */}
                        </div>

                        <div className="flex space-x-4 mb-6">
                            {/* <button onClick={handleAdd} className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Add to Cart
                            </button>
                            <button onClick={handleMin} className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Remove from Cart
                            </button> */}
                            <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                Wishlist
                            </button>
                            {/* <NavLink
                                to={-1}
                                className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Back
                            </NavLink> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product