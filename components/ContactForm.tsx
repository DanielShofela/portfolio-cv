import React, { useState } from 'react';

interface ContactFormProps {
  modelId: number;
  onSubmit: (formData: { name: string; email: string; phone: string; message: string; }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ modelId, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-inner">
        <h2 className="text-2xl font-bold text-brand-blue mb-6 text-center">Demande pour le modèle #{modelId}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <input type="hidden" name="modelId" value={modelId} />
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom complet</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Téléphone (Optionnel)</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message (Optionnel)</label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-orange focus:border-brand-orange sm:text-sm"
                ></textarea>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-brand-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition duration-300"
                >
                    Envoyer ma demande
                </button>
                <a
                  href="https://sdformulaire-cv.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-brand-blue rounded-full shadow-sm text-sm font-medium text-brand-blue bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue transition duration-300"
                >
                  Remplir le formulaire
                </a>
            </div>
        </form>
    </div>
  );
};

export default ContactForm;