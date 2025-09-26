import React, { useState } from 'react';

interface ContactFormProps {
  modelId: number;
  modelName?: string;
  onSubmit: (formData: { name: string; email: string; phone: string; message: string; modelName?: string }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ modelId, modelName, onSubmit }) => {
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

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    // send to Formspree
    try {
      const payload = new FormData();
      payload.append('modelId', String(modelId));
      if (modelName) payload.append('modelName', modelName);
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('message', formData.message);

      const res = await fetch('https://formspree.io/f/mblaqgej', {
        method: 'POST',
        body: payload,
        // Request JSON response to avoid Formspree redirecting to /thanks (which triggers CORS)
        headers: {
          Accept: 'application/json',
        } as any,
      });

      if (!res.ok) {
        // try to parse json error message if available
        let errText = `Formspree error: ${res.status}`;
        try {
          const json = await res.json();
          if (json && json.error) errText = json.error;
        } catch (_) {}
        throw new Error(errText);
      }

      // parse response JSON to inspect Formspree reply
      try {
        const json = await res.json();
        console.log('Formspree response:', json);
      } catch (e) {
        console.warn('Could not parse Formspree JSON response:', e);
      }

      setStatus('success');
      onSubmit({ ...formData, modelName });
      // clear form after successful send
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-inner">
  <h2 className="text-2xl font-bold text-brand-blue mb-6 text-center">Demande pour le modèle #{modelId}{modelName ? ` — ${modelName}` : ''}</h2>
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
          disabled={status === 'loading'}
          className={`w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent rounded-full shadow-sm text-sm font-medium text-white ${status === 'loading' ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-orange hover:bg-orange-600'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition duration-300`}
        >
          {status === 'loading' ? 'Envoi...' : 'Envoyer ma demande'}
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
        <div className="mt-4 text-center">
          {status === 'success' && <p className="text-green-600 font-medium">Merci — votre message a bien été envoyé.</p>}
          {status === 'error' && <p className="text-red-600 font-medium">Une erreur est survenue lors de l'envoi. Réessayez plus tard.</p>}
        </div>
    </div>
  );
};

export default ContactForm;