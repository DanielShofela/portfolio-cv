
import React from 'react';
import type { Testimonial } from '../types';

interface TestimonialsProps {
  items: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ items }) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue">Ce que disent nos clients</h2>
          <div className="w-24 h-1 bg-brand-orange mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
              <div className="text-right">
                <p className="font-bold text-brand-blue">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
