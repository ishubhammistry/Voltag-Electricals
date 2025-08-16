// src/components/ClientDynamicSections.tsx
'use client'; // This directive makes this file a Client Component

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import FAQ and Contact, ensuring they are only rendered on the client
const DynamicFAQ = dynamic(() => import('@/components/FAQ'), { ssr: false });
const DynamicContact = dynamic(() => import('@/components/Contact'), { ssr: false });

const ClientDynamicSections = () => {
  return (
    <>
      <DynamicFAQ />
      <DynamicContact />
    </>
  );
};

export default ClientDynamicSections;