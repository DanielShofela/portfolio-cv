import React from 'react';
import type { PortfolioCategory, Testimonial } from '../types';
import Hero from '../components/Hero';
import PortfolioGrid from '../components/PortfolioGrid';
import Testimonials from '../components/Testimonials';
import CtaSection from '../components/CtaSection';

interface PortfolioPageProps {
    categories: PortfolioCategory[];
    testimonials: Testimonial[];
    onSelectCategory: (id: string) => void;
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ categories, testimonials, onSelectCategory }) => {
    return (
        <>
            <Hero />
            <PortfolioGrid categories={categories} onSelectCategory={onSelectCategory} />
            <Testimonials items={testimonials} />
            <CtaSection />
        </>
    );
};

export default PortfolioPage;
