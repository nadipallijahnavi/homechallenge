import React from 'react';
import { X, Star, Calendar, User, Hash, ExternalLink, Globe, FileText } from 'lucide-react';
import { Book } from '../types/Book';

interface BookModalProps {
  book: Book;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: () => void;
}

export function BookModal({ book, isFavorite, onClose, onToggleFavorite }: BookModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Book Details</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleFavorite}
              className={`
                p-2 rounded-lg transition-all duration-200
                ${isFavorite 
                  ? 'bg-amber-100 text-amber-600 hover:bg-amber-200' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-amber-500'
                }
              `}
            >
              <Star className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Book Cover */}
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden">
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
                    <div className="text-center p-8">
                      <div className="w-24 h-24 bg-gray-300 rounded-xl mx-auto mb-4 flex items-center justify-center">
                        <span className="text-gray-500 text-3xl">📖</span>
                      </div>
                      <p className="text-gray-500 font-medium">No Cover Available</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Book Information */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                {book.subtitle && (
                  <p className="text-xl text-gray-600">{book.subtitle}</p>
                )}
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {book.author && (
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-teal-600" />
                    <span className="font-medium text-gray-900">Author:</span>
                    <span className="text-gray-700">{book.author}</span>
                  </div>
                )}
                
                {book.publishYear && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-gray-900">Published:</span>
                    <span className="text-gray-700">{book.publishYear}</span>
                  </div>
                )}

                {book.publisher && (
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-gray-900">Publisher:</span>
                    <span className="text-gray-700">{book.publisher}</span>
                  </div>
                )}

                {book.pages && (
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-gray-900">Pages:</span>
                    <span className="text-gray-700">{book.pages}</span>
                  </div>
                )}
              </div>

              {/* ISBN */}
              {book.isbn && book.isbn.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">ISBN:</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.isbn.map((isbn, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-mono"
                      >
                        {isbn}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Subjects */}
              {book.subjects && book.subjects.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Hash className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-medium text-gray-900">Subjects:</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {book.subjects.map((subject, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Languages */}
              {book.languages && book.languages.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Languages:</h3>
                  <div className="flex flex-wrap gap-2">
                    {book.languages.map((lang, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm"
                      >
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* External Link */}
              <div className="pt-4 border-t border-gray-200">
                <a
                  href={`https://openlibrary.org${book.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center space-x-2 px-4 py-2 
                    bg-blue-600 hover:bg-blue-700 text-white rounded-lg
                    font-medium transition-colors duration-200
                  "
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>View on Open Library</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}