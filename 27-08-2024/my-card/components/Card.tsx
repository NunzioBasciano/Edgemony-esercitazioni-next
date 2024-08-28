import React from 'react'
import { truncateText } from '@/function/truncateText';

export interface ICard {
    id: number,
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: IRating
}

export interface IRating {
    rate: number,
    count: number
}

interface CardProps {
    product: ICard;
}

function Card({ product }: CardProps) {
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
                <h5 className="m-3 text-l h-1/5  font-medium text-gray-900 text-center">
                    {truncateText(product.title, 8)}
                </h5>
                <span className="text-sm h-1/5  text-gray-500 dark:text-gray-400 m-3 text-center">
                    {product.category}
                </span>
                <p className="h-2/5 text-gray-900 text-sm m-1 text-left">{truncateText(product.description, 20)}</p>
                <div className="flex h-1/5 mt-4 md:mt-6 justify-center">
                    <p className="text-gray-900 text-xl">€{product.price.toFixed(2)}</p>
                </div>
            </div>
        </div>
    )
}

export default Card