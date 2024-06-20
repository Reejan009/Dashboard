import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Details from '@/components/Details/Details';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import React from 'react';

const Page = () => {
    return (
        <div>
        <DefaultLayout>
            <Breadcrumb pageName='Details'/>
            <Details/>
      </DefaultLayout>
      </div>
    );
}

export default Page;
