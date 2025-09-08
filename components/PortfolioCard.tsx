import React from 'react';
import type { PortfolioCategory } from '../types';

interface PortfolioCardProps {
  category: PortfolioCategory;
  onSelectCategory: (id: string) => void;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({ category, onSelectCategory }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300">
      <img src={category.heroImage} alt={category.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-brand-blue">{category.title}</h3>
        <p className="text-gray-600 text-base flex-grow">{category.description}</p>
        <button 
          onClick={() => onSelectCategory(category.id)}
          className="mt-4 self-start bg-transparent text-brand-orange font-semibold py-2 px-4 border border-brand-orange rounded-full hover:bg-brand-orange hover:text-white transition duration-300 focus:outline-none focus:ring-2 focus:ring-brand-orange"
        >
          Voir plus
        </button>
      </div>
    </div>
  );
};

export default PortfolioCard;
