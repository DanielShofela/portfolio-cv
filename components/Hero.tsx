
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-brand-blue text-white py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Nos Réalisations en Supports Professionnels
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Découvrez nos créations de CV, lettres de motivation, portfolios en ligne et identités visuelles.
        </p>
        <a
          href="#contact"
          className="bg-brand-orange text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105 inline-block"
        >
          Nous contacter
        </a>
      </div>
    </section>
  );
};

export default Hero;
