"use client"
import Card from "@/components/Card";
import { useState, useEffect } from "react";


export default function Home() {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    getProducts();
    console.log(products);
  }, [])

  return (
    <div className="grid grid-cols-1 justify-center md:grid-cols-3 gap-4 m-4 ">
      {products.map((product, index) => (
        <Card key={index} product={product} />
      ))}
    </div>
  );
}
