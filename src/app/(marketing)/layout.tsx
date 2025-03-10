import React from 'react';
import {  Navbar } from "@/components";

interface Props {
    children: React.ReactNode
}

const MarketingLayout = ({ children }: Props) => {
    return (
        <div className='bg-black suppressHydrationWarning'>
            <div id="home" className="absolute bg-black w-full h-full" />
            <Navbar />
            <main className="mt-20 mx-auto bg-black w-full z-0 relative">
                {children}
            </main>
            
        </div>
    );
};

export default MarketingLayout;
