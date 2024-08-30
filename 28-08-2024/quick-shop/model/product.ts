export interface IProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
    rating: IRating;
    quantity?: number;
}

interface IRating {
    rate: number;
    count: number;
}

export interface IAddProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string
}