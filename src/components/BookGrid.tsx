import React from 'react';
import { BookCard } from './BookCard';
import { Book } from '../types/Book';

interface BookGridProps {
  books: Book[];
  favorites: Set<string>;
  onBookSelect: (book: Book) => void;
  onToggleFavorite: (bookKey: string) => void;
}

export function BookGrid({ books, favorites, onBookSelect, onToggleFavorite }: BookGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.key}
          book={book}
          isFavorite={favorites.has(book.key)}
          onClick={() => onBookSelect(book)}
          onToggleFavorite={() => onToggleFavorite(book.key)}
        />
      ))}
    </div>
  );
}