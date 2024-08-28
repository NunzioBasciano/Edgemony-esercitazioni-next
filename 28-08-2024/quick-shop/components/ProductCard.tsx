import { truncateText } from '@/function/truncateText';
import { IProduct } from '@/model/product';
import Link from 'next/link';
import React from 'react';

interface ProductProps {
    product: IProduct;
}


function ProductCard({ product }: ProductProps) {
    return (
        <div
            key={product.id}
            className="shadow-lg mx-auto max-w-sm bg-white border-gray-200 rounded-lg dark:bg-white dark:border-gray-700 p-4 flex flex-col justify-between"
            style={{ height: '600px' }}  // Assegna un'altezza fissa per la card per il layout 50-50
        >
            <div className="h-1/2 flex justify-center items-center">
                <img
                    className="h-full object-contain"
                    src={product.image}
                    alt={product.title}
                />
            </div>

            <div className="h-1/2 m-1">
                <Link href={`/${product.id}`}>
                    <h5 className="text-xl m-2 h-1/5 font-semibold tracking-tight text-gray-900 dark:text-dark-blue">{truncateText(product.title, 7)}</h5>
                </Link>
                <span className="text-sm h-1/5  text-gray-500 dark:text-gray-400 m-3 text-center">
                    {product.category}
                </span>
                <p className="h-2/5 text-gray-900 text-sm m-1 text-left">{truncateText(product.description, 30)}</p>
                <div className="flex h-1/5 mt-4 md:mt-6 justify-center">
                    <p className="text-gray-900 text-xl">€{product.price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard