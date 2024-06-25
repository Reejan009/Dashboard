// ProductDetailsPage.jsx
"use client"
import { useRouter } from 'next/navigation';
import React from 'react';

// Define the Product interface


interface Product {
    title: string;
    description: string;
    price: number;
    rating: number;
    images: any;
}

const ProductDetailsPage: React.FC<{ product: Product }> = ({ product }) => {
    const router = useRouter()
    return (
        <div>
            <h2>{product?.title}</h2>
            <p>Description: {product?.description}</p>
            <p>Price: {product?.price}</p>
            <p>Rating: {product?.rating}</p>
            <img src={product?.images[0]} alt={product?.title} /> 
            <button onClick={()=>
                router.back() }> back </button>
           
        </div>
    );
};  

export default ProductDetailsPage;
