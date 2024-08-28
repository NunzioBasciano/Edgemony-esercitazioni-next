import { IProduct } from "@/model/product";

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

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);

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
                        </div>

                        <div className="flex space-x-4 mb-6">
                            <button className="bg-gray-200 flex gap-2 items-center text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                                Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}