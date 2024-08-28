import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/model/product";

const getProducts = async (path: string): Promise<IProduct[]> => {
    try {
        const res = await fetch(`https://fakestoreapi.com/category/${path}`);
        if (!res.ok) {
            throw new Error('Failed to fetch product');
        }
        return res.json();
    } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "Error fetching product";
        throw Error(message);
    }
};

export default async function Home({ params }: { params: { path: string } }) {

    const products = await getProducts(params.path);


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
