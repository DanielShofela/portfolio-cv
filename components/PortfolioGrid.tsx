import React from 'react';
import type { PortfolioCategory } from '../types';
import PortfolioCard from './PortfolioCard';

interface PortfolioGridProps {
  categories: PortfolioCategory[];
  onSelectCategory: (id: string) => void;
}

const PortfolioGrid: React.FC<PortfolioGridProps> = ({ categories, onSelectCategory }) => {
  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <PortfolioCard key={category.id} category={category} onSelectCategory={onSelectCategory} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioGrid;
