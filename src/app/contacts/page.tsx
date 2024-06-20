import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import TableOne from '@/components/Tables/TableOne';
import React from 'react';
const contactHeaders = ["Name", "Address", "Phone", "Email"];
const contactData = [
  {
    name: "John Doe",
    address: "123 Main St, City",
    phone: "123-456-7890",
    email: "john.doe@example.com",
  },
  {
    name: "John Doe",
    address: "123 Main St, City",
    phone: "123-456-7890",
    email: "john.doe@example.com",
  },
  {
    name: "John Doe",
    address: "123 Main St, City",
    phone: "123-456-7890",
    email: "john.doe@example.com",
  },
  {
    name: "John Doe",
    address: "123 Main St, City",
    phone: "123-456-7890",
    email: "john.doe@example.com",
  },
  // Add other contacts as needed
];

const Page = () => {
    return (
        <div>
            <DefaultLayout>
                {/* <h1>Home Page</h1> */}
                <Breadcrumb pageName='Contacts'/>
                <TableOne headers={contactHeaders} data={contactData}/>
            </DefaultLayout>
            {/* these are my contacts */}
        </div>
    );
}

export default Page;
