import { IProduct } from "@/model/product";
import ProductCard from "../../../components/ProductCard";
import { labels } from "@/data/labels";

const getProducts = async () => {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/category/${labels.jewelryLabel}`);
        const data: Promise<IProduct[]> = res.json();

        return data;
    } catch (error: any) {
        throw Error(error.message);

    }
}

export default async function Jewelry() {

    const products = await getProducts();
    return (
        <>
            <div className="flex items-center justify-center flex-wrap">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-1">
                    {products.map((product: any) => (
                        <ProductCard
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}