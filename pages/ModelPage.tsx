import React, { useState } from 'react';
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
            {(() => {
              const parts = model.imageSrc.split('/');
              const file = parts[parts.length - 1] || model.alt;
              const name = file.replace(/\.[^/.]+$/, '');
              return (
                <h1 className="text-3xl md:text-4xl font-bold text-brand-blue text-center mb-8">Modèle de {name}</h1>
              );
            })()}
            <div className="bg-white p-4 rounded-lg shadow-xl mb-4 border border-gray-200">
              <img src={images[selectedIndex]} alt={model.alt} className="w-full h-auto rounded-lg" />
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
                modelName={(model.imageSrc.split('/').pop() || model.alt).replace(/\.[^/.]+$/, '')}
                onSubmit={handleFormSubmit}
              />
            )}
        </div>
      </div>
    </section>
  );
};

export default ModelPage;
