"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import TableOne from '@/components/Tables/TableOne';
import ProductDetailsPage from './details/page';

const contactHeaders = ["Title", "Description", "Price", "Rating", "Image"];
const url = 'http://127.0.0.1:5000/api/inventory';

const Page = () => {
    const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        rating: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get(url)
            .then(response => {
                const data = response.data.products;
                setContactData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleInputChange = (e:any) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e:any) => {
        e.preventDefault();
        axios.post(url, formData)
            .then(response => {
                console.log('Product added:', response.data);
                setFormData({
                    title: '',
                    description: '',
                    price: '',
                    rating: ''
                });
                fetchData(); // Refresh data after adding new product
            })
            .catch(error => {
                console.error('Error adding product:', error);
            });
    };

    const handleProductClick = (product:any) => {
        setSelectedProduct(product);
    };

    return (
        <div>
            <DefaultLayout>
                <Breadcrumb pageName='Products' />
                <div className='flex justify-center'>
                    {/* <h2 className='font-bold'>Add Product</h2> */}
                    <form onSubmit={handleSubmit} className='flex gap-3 flex-col w-[400px]  '>
                        <label>Title:</label>
                        <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                        <br />
                        <label>Description:</label>
                        <input type="text" name="description" value={formData.description} onChange={handleInputChange} required />
                        <br />
                        <label>Price:</label>
                        <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                        <br />
                        <label>Rating:</label>
                        <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} required />
                        <br />
                        <button type="submit" className='bg-slate-300 rounded'>Add Product</button>
                    </form>
                </div>
                <br />
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
