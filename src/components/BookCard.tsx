import React from 'react';
import { Star, Calendar, User, Eye } from 'lucide-react';
import { Book } from '../types/Book';

interface BookCardProps {
  book: Book;
  isFavorite: boolean;
  onClick: () => void;
  onToggleFavorite: () => void;
}

export function BookCard({ book, isFavorite, onClick, onToggleFavorite }: BookCardProps) {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div 
      onClick={onClick}
      className="
        bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200
        transform hover:-translate-y-1 transition-all duration-300 cursor-pointer
        group overflow-hidden
      "
    >
      {/* Book Cover */}
      <div className="relative aspect-[3/4] bg-gray-100">
        {book.coverUrl ? (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-gray-500 text-lg font-bold">📖</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">No Cover</p>
            </div>
          </div>
        )}
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`
            absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border
            transition-all duration-200 opacity-0 group-hover:opacity-100
            ${isFavorite 
              ? 'bg-amber-100 border-amber-300 text-amber-600' 
              : 'bg-white/80 border-white/20 text-gray-400 hover:text-amber-500'
            }
          `}
        >
          <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* View Details Overlay */}
        <div className="
          absolute inset-0 bg-black/0 group-hover:bg-black/10 
          transition-all duration-300 flex items-center justify-center
        ">
          <div className="
            opacity-0 group-hover:opacity-100 transition-opacity duration-300
            bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center space-x-2
          ">
            <Eye className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">View Details</span>
          </div>
        </div>
      </div>

      {/* Book Info */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 leading-snug">
          {book.title}
        </h3>
        
        {book.author && (
          <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
            <User className="h-3 w-3" />
            <span className="line-clamp-1">{book.author}</span>
          </div>
        )}
        
        {book.publishYear && (
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>{book.publishYear}</span>
          </div>
        )}

        {book.subjects && book.subjects.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {book.subjects.slice(0, 2).map((subject, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 text-xs bg-blue-50 text-blue-700 rounded-md"
              >
                {subject}
              </span>
            ))}
            {book.subjects.length > 2 && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-50 text-gray-500 rounded-md">
                +{book.subjects.length - 2} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}