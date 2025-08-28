export interface Book {
  key: string;
  title: string;
  subtitle?: string;
  author?: string;
  authors?: string[];
  publishYear?: number;
  publisher?: string;
  isbn?: string[];
  subjects?: string[];
  languages?: string[];
  pages?: number;
  coverUrl?: string;
}