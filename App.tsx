import React, { useState, useCallback } from 'react';
import { portfolioData, testimonials } from './data';
import type { PortfolioCategory, Model } from './types';
import PortfolioPage from './pages/PortfolioPage';
import GalleryPage from './pages/GalleryPage';
import ModelPage from './pages/ModelPage';
import Footer from './components/Footer';

type View = 'portfolio' | 'gallery' | 'model';

const App: React.FC = () => {
  const [view, setView] = useState<View>('portfolio');
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory | null>(null);
  const [activeModel, setActiveModel] = useState<Model | null>(null);

  const handleSelectCategory = useCallback((categoryId: string) => {
    const category = portfolioData.find(cat => cat.id === categoryId);
    if (category) {
      setActiveCategory(category);
      setView('gallery');
      window.scrollTo(0, 0);
    }
  }, []);

  const handleSelectModel = useCallback((modelId: number) => {
    if (activeCategory) {
      const model = activeCategory.models.find(mod => mod.id === modelId);
      if (model) {
        setActiveModel(model);
        setView('model');
        window.scrollTo(0, 0);
      }
    }
  }, [activeCategory]);
  
  const handleGoBackToPortfolio = useCallback(() => {
    setActiveCategory(null);
    setActiveModel(null);
    setView('portfolio');
    window.scrollTo(0, 0);
  }, []);

  const handleGoBackToGallery = useCallback(() => {
    setActiveModel(null);
    setView('gallery');
    window.scrollTo(0, 0);
  }, []);

  const renderContent = () => {
    switch (view) {
      case 'gallery':
        return activeCategory ? <GalleryPage category={activeCategory} onSelectModel={handleSelectModel} onBack={handleGoBackToPortfolio} /> : null;
      case 'model':
        return activeCategory && activeModel ? <ModelPage category={activeCategory} model={activeModel} onBack={handleGoBackToGallery} /> : null;
      case 'portfolio':
      default:
        return <PortfolioPage categories={portfolioData} testimonials={testimonials} onSelectCategory={handleSelectCategory} />;
    }
  }

  return (
    <div className="bg-gray-50 font-sans text-brand-blue min-h-screen flex flex-col">
      {view === 'portfolio' && (
        <header className="bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto px-6 py-3">
              <a href="https://soutiendigital.netlify.app/" className="text-brand-orange hover:underline inline-flex items-center text-sm font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Retour au site principal
              </a>
          </div>
        </header>
      )}
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;