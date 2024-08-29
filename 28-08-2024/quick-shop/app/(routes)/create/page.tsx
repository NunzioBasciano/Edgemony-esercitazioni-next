'use client'
import { IAddProduct } from '@/model/product'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'


// Funzione per aggiungere un prodotto
const addProduct = async (body: IAddProduct) => {
    try {
        const data = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        return data.json();
    } catch (error: any) {
        throw new Error(error.message);
    }
}

function CreateItem() {
    const initialState: IAddProduct = {
        id: 1,
        title: '',
        description: '',
        category: '',
        price: 0,
        image: ''
    }

    const [form, setForm] = useState(initialState);

    const titleValidation = form.title.length > 2;
    const descriptionValidation = form.description.length > 10;
    const priceValidation = form.price > 0;
    const imageValidation = form.image.length > 0;
    const formValidation = titleValidation && descriptionValidation && priceValidation && imageValidation;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { name, value } = e.target;

        if (name === 'price') {
            setForm(prevState => ({
                ...prevState,
                [name]: Number(value)
            }));
        } else {
            setForm(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            e.preventDefault();
            if (formValidation) {
                const res = await addProduct(form);
                console.log(res);
                alert('Product added successfully!');
                setForm(initialState);
            } else {
                alert('Please fill in all fields correctly.');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log(form);
    }, [form]);

    return (
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg">
                <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Aggiungi qui i dati del tuo articolo</h1>

                <form onSubmit={handleSubmit} className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                    <div>
                        <label className="text-indigo-600">Title</label>
                        <div className="relative">
                            <input
                                name='title'
                                onChange={handleChange}
                                value={form.title}
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter title"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-indigo-600">Description</label>
                        <div className="relative">
                            <input
                                name='description'
                                onChange={handleChange}
                                value={form.description}
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter description"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-indigo-600">Category</label>
                        <div className="relative">
                            <select
                                name='category'
                                onChange={handleChange} // Sposta onChange qui
                                value={form.category}
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            >
                                <option value="">Select a category</option>
                                <option value="electronics">electronics</option>
                                <option value="jewelery">jewelry</option>
                                <option value="men's clothing">men's clothing</option>
                                <option value="women's clothing">women's clothing</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-indigo-600">Price</label>
                        <div className="relative">
                            <input
                                name='price'
                                onChange={handleChange}
                                value={form.price}
                                type="number"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter price"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-indigo-600">Image</label>
                        <div className="relative">
                            <input
                                name='image'
                                onChange={handleChange}
                                value={form.image}
                                type="text"
                                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter image URL"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg"
                    /* disabled={ } */
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    )
}

export default CreateItem;