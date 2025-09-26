import React, { useMemo, useState } from 'react';
import type { PortfolioCategory } from '../types';

interface GalleryPageProps {
  category: PortfolioCategory;
  onSelectModel: (id: number) => void;
  onBack: () => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ category, onSelectModel, onBack }) => {
  const [filter, setFilter] = useState<'all' | 'cv' | 'lm'>('all');

  // derive filtered models when viewing the CV & LM category
  const filteredModels = useMemo(() => {
    if (category.id !== 'cv-lettres-motivation' || filter === 'all') return category.models;
    if (filter === 'cv') return category.models.filter(m => m.imageSrc.includes('/CV/'));
    return category.models.filter(m => m.imageSrc.includes('/LM/'));
  }, [category, filter]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-12">
            <button onClick={onBack} className="text-brand-orange hover:underline mb-4 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Retour au portfolio
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-blue">{category.title}</h1>
            <p className="text-lg text-gray-600 mt-2">{category.description}</p>
        </div>
        
        {/* Filter controls only for the CV & LM category */}
        {category.id === 'cv-lettres-motivation' && (
          <div className="mb-6">
            <div className="inline-flex rounded-full bg-gray-100 p-1">
              <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-brand-orange text-white' : 'text-gray-700'}`}>Tous</button>
              <button onClick={() => setFilter('cv')} className={`px-4 py-2 rounded-full ${filter === 'cv' ? 'bg-brand-orange text-white' : 'text-gray-700'}`}>CV</button>
              <button onClick={() => setFilter('lm')} className={`px-4 py-2 rounded-full ${filter === 'lm' ? 'bg-brand-orange text-white' : 'text-gray-700'}`}>LM</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredModels.map((model) => (
            <div key={model.id} className="group relative shadow-lg rounded-lg overflow-hidden">
              <img src={model.imageSrc} alt={model.alt} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => onSelectModel(model.id)} className="bg-brand-orange text-white font-bold py-2 px-6 rounded-full hover:bg-orange-600 transition duration-300 transform hover:scale-105">
                  Voir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryPage;
