// Page.jsx
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import TableOne from '@/components/Tables/TableOne';
import ProductDetailsPage from './details/page';
// import ProductDetailsPage from './ProductDetailsPage'; // Import the new component

const contactHeaders = ["Title", "Description", "Price", "Rating", "Image"];
const url = 'https://dummyjson.com/products';

const Page = () => {
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product

    useEffect(() => {
        axios.get(url)
            .then(response => {
                const data = response.data.products;

                if (Array.isArray(data)) {
                    const formattedData:any = data.map((item) => ({
                        title: item.title,
                        description: item.description,
                        price: item.price,
                        rating: item.rating,
                        images: item.images && item.images.length > 0 ? item.images[0] : 'No Image Available'
                    }));
                    setContactData(formattedData);
                } else {
                    console.error('Expected an array of products');
                }
            })
            .catch(error => {
                console.error(`Error fetching data: ${error}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Function to handle click on a product tile
    const handleProductClick = (product:any) => {
        setSelectedProduct(product); // Set selected product for rendering details
    };

    return (
        <div>
            <DefaultLayout>
                <Breadcrumb pageName='Products' />
                {loading ? (
                    <p>Loading...</p>
                ) : selectedProduct ? (
                    <ProductDetailsPage product={selectedProduct} />
                ) : (
                    <TableOne headers={contactHeaders} data={contactData}/>
                )}
            </DefaultLayout>
        </div>
    );
}

export default Page;
