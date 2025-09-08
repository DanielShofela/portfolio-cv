export interface Model {
  id: number;
  imageSrc: string;
  alt: string;
}

export interface PortfolioCategory {
  id: string;
  title: string;
  description: string;
  heroImage: string;
  models: Model[];
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}
