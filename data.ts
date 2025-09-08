import type { PortfolioCategory, Testimonial } from './types';

export const portfolioData: PortfolioCategory[] = [
  {
    id: 'cv-lettres-motivation',
    title: 'CV & Lettres de motivation percutants',
    description: 'Des designs modernes et professionnels pour vous démarquer auprès des recruteurs.',
    heroImage: 'https://picsum.photos/seed/cv/600/400',
    models: [
      { id: 101, imageSrc: 'https://picsum.photos/seed/cv1/600/800', alt: 'Modèle de CV 1' },
      { id: 102, imageSrc: 'https://picsum.photos/seed/cv2/600/800', alt: 'Modèle de CV 2' },
      { id: 103, imageSrc: 'https://picsum.photos/seed/cv3/600/800', alt: 'Modèle de CV 3' },
      { id: 104, imageSrc: 'https://picsum.photos/seed/cv4/600/800', alt: 'Modèle de CV 4' },
      { id: 105, imageSrc: 'https://picsum.photos/seed/cv5/600/800', alt: 'Modèle de CV 5' },
      { id: 106, imageSrc: 'https://picsum.photos/seed/cv6/600/800', alt: 'Modèle de CV 6' },
    ]
  },
  {
    id: 'portfolios-en-ligne',
    title: 'Portfolios en ligne modernes',
    description: 'Présentez vos travaux et compétences avec un site web élégant et responsive.',
    heroImage: 'https://picsum.photos/seed/portfolio/600/400',
    models: [
      { id: 201, imageSrc: 'https://picsum.photos/seed/p1/800/600', alt: 'Modèle de Portfolio 1' },
      { id: 202, imageSrc: 'https://picsum.photos/seed/p2/800/600', alt: 'Modèle de Portfolio 2' },
      { id: 203, imageSrc: 'https://picsum.photos/seed/p3/800/600', alt: 'Modèle de Portfolio 3' },
    ]
  },
  {
    id: 'visuels-communication',
    title: 'Visuels (flyers, affiches, bannières)',
    description: 'Des créations graphiques impactantes pour vos campagnes de communication.',
    heroImage: 'https://picsum.photos/seed/visuals/600/400',
    models: [
        { id: 301, imageSrc: 'https://picsum.photos/seed/v1/600/400', alt: 'Modèle de Flyer 1' },
        { id: 302, imageSrc: 'https://picsum.photos/seed/v2/600/400', alt: 'Modèle de Affiche 2' },
        { id: 303, imageSrc: 'https://picsum.photos/seed/v3/600/400', alt: 'Modèle de Bannière 3' },
    ]
  },
  {
    id: 'logos-identite-visuelle',
    title: 'Création de logos & identité visuelle',
    description: 'Une identité forte et mémorable pour construire votre image de marque.',
    heroImage: 'https://picsum.photos/seed/logo/600/400',
    models: [
        { id: 401, imageSrc: 'https://picsum.photos/seed/l1/500/500', alt: 'Modèle de Logo 1' },
        { id: 402, imageSrc: 'https://picsum.photos/seed/l2/500/500', alt: 'Modèle de Logo 2' },
        { id: 403, imageSrc: 'https://picsum.photos/seed/l3/500/500', alt: 'Modèle de Logo 3' },
        { id: 404, imageSrc: 'https://picsum.photos/seed/l4/500/500', alt: 'Modèle de Logo 4' },
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: 'Leur approche professionnelle et créative a transformé mon CV. J\'ai obtenu plus d\'entretiens en une semaine qu\'en trois mois !',
    author: 'Julien Mercier',
    role: 'Développeur Full-Stack'
  },
  {
    id: 2,
    quote: 'Soutien Digital a créé une identité visuelle pour ma startup qui est à la fois moderne et parfaitement alignée avec nos valeurs. Le résultat est exceptionnel.',
    author: 'Carla Dubois',
    role: 'CEO & Fondatrice de Techova'
  },
  {
    id: 3,
    quote: 'Mon portfolio en ligne est magnifique et très fonctionnel. C\'est un outil indispensable qui met vraiment en valeur mon travail de photographe.',
    author: 'David Lemoine',
    role: 'Photographe Indépendant'
  }
];
