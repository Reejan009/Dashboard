// ProductDetailsPage.jsx

import React from 'react';

// Define the Product interface
interface Product {
  title: string;
  description: string;
  price: number;
  rating: number;
  images: string[];
}

const ProductDetailsPage: React.FC<{ product: Product }> = ({ product }) => {
    return (
        <div>
            <h2>{product.title}</h2>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <img src={product.images[0]} alt={product.title} /> {/* Assuming you want to display the first image */}
            {/* Add more details as needed */}
        </div>
    );
};

export default ProductDetailsPage;
