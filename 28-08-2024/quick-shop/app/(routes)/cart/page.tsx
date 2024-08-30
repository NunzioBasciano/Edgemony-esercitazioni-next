'use client';

import { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../../../providers/ProductContext';
import { IProduct } from '@/model/product';

const CartPage: React.FC = () => {
    const [total, setTotal] = useState<number>(0);
    const context = useContext(ProductContext);

    if (!context) {
        throw new Error('CartPage must be used within a ProductProvider');
    }

    const { products, setProducts } = context;

    // Funzione per calcolare il totale
    const getTotal = (arr: IProduct[]) => {
        const total = arr.reduce((acc, product) => {
            const quantity = product.quantity ?? 1; // Imposta un valore predefinito se quantity è undefined
            return acc + product.price * quantity;
        }, 0);
        setTotal(total);
    };

    // Gestione della rimozione del prodotto
    const handleDelete = (id: number) => {
        setProducts(prevState => prevState.filter(product => product.id !== id));
    };

    const handleMin = (id: number) => {
        setProducts(prevState => prevState.map(product => {
            if (product.id === id) {
                const newQuantity = (product.quantity ?? 1) - 1;
                return {
                    ...product,
                    quantity: newQuantity > 1 ? newQuantity : 1,
                };
            }
            return product;
        }));
    };
    const handleAdd = (id: number) => {
        setProducts(prevState => prevState.map(product => {
            if (product.id === id) {
                const newQuantity = (product.quantity ?? 0) + 1;
                return {
                    ...product,
                    quantity: newQuantity,
                };
            }
            return product;
        }));
    };

    useEffect(() => {
        getTotal(products);
    }, [products]);

    return (
        <div className="relative overflow-x-auto shadow-md">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-16 py-3">Image</th>
                        <th scope="col" className="px-6 py-3">Product</th>
                        <th scope="col" className="px-6 py-3">Qty</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-4 text-center">No products in cart</td>
                        </tr>
                    ) : (
                        products.map(product => (
                            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="p-4">
                                    <img src={product.image} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {product.title}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => handleMin(product.id)}
                                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                            type="button"
                                        >
                                            <span className="sr-only">Decrease Quantity</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                            </svg>
                                        </button>
                                        <span className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.quantity}</span>
                                        <button
                                            onClick={() => handleAdd(product.id)}
                                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                            type="button"
                                        >
                                            <span className="sr-only">Increase Quantity</span>
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {(product.price * product.quantity).toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                        <td colSpan={3} className="px-6 py-4 text-right font-bold text-gray-900 dark:text-white">Total</td>
                        <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{total.toFixed(2)}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default CartPage;
