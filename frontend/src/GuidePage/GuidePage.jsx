import React from 'react';
import Hero from './Hero';
import { NavbarDemo } from '@/NavbarDemo';
import Steps from './Steps';
import BloomSkinFooter from '@/HomePage/BloomSkinFooter';
import BloomSkinDosDonts from './BloomSkinDosDonts';

const GuidePage = () => {
    return (
        <>
            <NavbarDemo />
            <Hero />
            <Steps />
            <BloomSkinDosDonts />
            <BloomSkinFooter />
        </>
    );
};

export default GuidePage;