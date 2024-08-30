'use client'

import { IProduct } from "@/model/product";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useProductContext } from "@/providers/ProductContext";

// Funzione per ottenere i dati del prodotto basato su ID
const getProductById = async (id: string): Promise<IProduct> => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch product');
        }
        return res.json();
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Error fetching product";
        throw Error(message);
    }
};

interface ProductPageProps {
    params: { id: string };
}

export default function ProductPage({ params }: ProductPageProps) {
    const { id } = params;
    const { products, setProducts } = useProductContext();
    const [product, setProduct] = useState<IProduct | null>(null);  // Stato per il prodotto
    const [quantity, setQuantity] = useState<number>(1);  // Stato per la quantità

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await getProductById(id);
                setProduct(fetchedProduct);  // Imposta il prodotto nello stato
            } catch (error) {
                console.error(error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleAdd = () => {
        if (!product) return;

        setProducts((prevState) => {
            const existingProduct = prevState.find(p => p.id === product.id);
            if (existingProduct) {
                return prevState.map(p =>
                    p.id === product.id ? { ...p, quantity: (p.quantity ?? 0) + quantity } : p
                );
            } else {
                return [...prevState, { ...product, quantity }];
            }
        });
    };

    const handleMin = () => {
        if (!product) return;

        setProducts(prevState => {
            const existingProduct = prevState.find(p => p.id === product.id);
            if (existingProduct) {
                if ((existingProduct.quantity ?? 0) > quantity) {
                    return prevState.map(p =>
                        p.id === product.id
                            ? { ...p, quantity: (p.quantity ?? 0) - quantity }
                            : p
                    );
                } else {
                    return prevState.filter(p => p.id !== product.id);
                }
            }
            return prevState;
        });
    };

    if (!product) {
        return <div>Loading...</div>;  // Renderizza un messaggio di caricamento se il prodotto non è ancora stato caricato
    }

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full md:w-1/2 px-4 mb-8">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-3/4 mx-auto h-auto rounded-lg shadow-md mb-4"
                            id="mainImage"
                        />
                    </div>

                    <div className="w-full md:w-1/2 px-4">
                        <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
                        <p className="text-gray-600 mb-4">{product.category}</p>
                        <div className="mb-4">
                            <span className="text-2xl font-bold mr-2">${product.price}</span>
                        </div>
                        <div className="flex items-center mb-4">
                            <span className="ml-2 text-gray-600">
                                {product.rating.rate} ({product.rating.count})
                            </span>
                        </div>
                        <p className="text-gray-700 mb-6">{product.description}</p>

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
                            <input
                                type="number"
                                id="quantity"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                className="border rounded-md p-2"
                            />
                        </div>
                        <div className="flex space-x-4 mb-6">
                            <button onClick={handleAdd} className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Add to Cart
                            </button>
                            <button onClick={handleMin} className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Remove from Cart
                            </button>
                            <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                Wishlist
                            </button>
                            <Link
                                href={'/'}
                                className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}