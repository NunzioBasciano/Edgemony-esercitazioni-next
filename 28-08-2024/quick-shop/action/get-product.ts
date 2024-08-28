import { IProduct } from "@/model/product";


export const getProduct = async (id: any): Promise<IProduct> => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);

        const data = await res.json();

        return data;
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "messaggio mio";
        throw Error(message);
    }
};