import type { PortableTextBlock } from '@portabletext/types';

export interface SanitySlug {
  _type: 'slug';
  current: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface SanityFile {
  _type: 'file';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface Brand {
  _id: string;
  _type: 'brand';
  name: string;
  slug: SanitySlug;
}

export interface Category {
  _id: string;
  _type: 'category';
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  description?: string;
  is_featured?: boolean;
  productLines?: ProductLine[];
}

export interface ProductLine {
  _id: string;
  _type: 'productLine';
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  description?: string;
  products?: Product[];
}

export interface Product {
  _id: string;
  _type: 'product';
  name: string;
  slug: SanitySlug;
  image?: SanityImage;
  price?: number;
  description?: string;
  specifications?: {
    _key: string;
    key: string;
    value: string;
  }[];
  brand?: {
    name: string;
  };
  productLine?: {
    slug: SanitySlug;
    category: {
      name: string;
      slug: SanitySlug;
    };
  };
}

export interface Post {
  _id: string;
  _type: 'post';
  title: string;
  slug: SanitySlug;
  mainImage?: SanityImage;
  publishedAt: string;
  body: PortableTextBlock[];
}

export interface Brochure {
  _id: string;
  _type: 'brochure';
  companyName: string;
  companyLogo?: SanityImage;
  brochureFile: SanityFile;
}

export interface ContactSubmission {
  _id: string;
  _type: 'contactSubmission';
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  createdAt?: string;
}
