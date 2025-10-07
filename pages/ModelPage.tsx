import React, { useState, useEffect, useCallback } from 'react';
import type { Model, PortfolioCategory } from '../types';
import ContactForm from '../components/ContactForm';

interface ModelPageProps {
  category: PortfolioCategory;
  model: Model;
  onBack: () => void;
}

const ModelPage: React.FC<ModelPageProps> = ({ category, model, onBack }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // gallery state: show additional images if provided by the model
  const images = (model.images && model.images.length > 0) ? model.images : [model.imageSrc];
  const [selectedIndex, setSelectedIndex] = useState(0);

  const showPrev = useCallback(() => {
    setSelectedIndex(i => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const showNext = useCallback(() => {
    setSelectedIndex(i => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showPrev, showNext]);

  const handleFormSubmit = (formData: { name: string; email: string; phone: string; message: string; modelName?: string }) => {
    console.log("Form submitted for model:", {
      modelId: model.id,
      category: category.title,
      ...formData,
    });
    setIsFormSubmitted(true);
    setIsFormOpen(false);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-8">
            <button onClick={onBack} className="text-brand-orange hover:underline mb-4 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Retour à la galerie "{category.title}"
            </button>
        </div>

        <div className="max-w-4xl mx-auto">
            {/* derive model name from filename if available */}
            {/** model.imageSrc expected like '.../CV 001H.png' */}
            {/* Use folder-based alt (model.alt) as the model name for a cleaner title */}
            <h1 className="text-3xl md:text-4xl font-bold text-brand-blue text-center mb-8">Modèle — {model.alt}</h1>
            <div className="relative bg-white p-4 rounded-lg shadow-xl mb-4 border border-gray-200">
              <img src={images[selectedIndex]} alt={model.alt} className="w-full h-auto rounded-lg" />

              {/* Left / right navigation buttons (overlay) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={showPrev}
                    aria-label="Image précédente"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-blue rounded-full p-2 shadow-md focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={showNext}
                    aria-label="Image suivante"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-brand-blue rounded-full p-2 shadow-md focus:outline-none"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails / gallery navigation */}
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-3 mb-8 overflow-x-auto">
                {images.map((src, idx) => (
                  <button
                    key={src + idx}
                    onClick={() => setSelectedIndex(idx)}
                    className={`rounded-md overflow-hidden border ${selectedIndex === idx ? 'border-brand-orange ring-2 ring-brand-orange' : 'border-gray-200'} focus:outline-none`}
                    aria-label={`Afficher l'image ${idx + 1}`}
                  >
                    <img src={src} alt={`${model.alt} - ${idx + 1}`} className="h-20 w-32 object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="text-center">
                {isFormSubmitted ? (
                    <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md" role="alert">
                        <p className="font-bold">Merci !</p>
                        <p>Votre demande a bien été envoyée. Nous vous contacterons bientôt.</p>
                    </div>
                ) : (
                    !isFormOpen && (
                        <button 
                            onClick={() => setIsFormOpen(true)}
                            className="bg-brand-orange text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105 inline-block"
                        >
                            Choisir ce modèle
                        </button>
                    )
                )}
            </div>
            
            {isFormOpen && (
              <ContactForm
                modelId={model.id}
                modelName={model.alt}
                onSubmit={handleFormSubmit}
              />
            )}
        </div>
      </div>
    </section>
  );
};

export default ModelPage;
