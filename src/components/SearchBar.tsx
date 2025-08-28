import React from 'react';
import { Search, Hash, User, BookOpen, Barcode } from 'lucide-react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  searchType: string;
  onSearchTypeChange: (type: string) => void;
  onSearch: () => void;
}

const searchTypes = [
  { value: 'title', label: 'Title', icon: BookOpen },
  { value: 'author', label: 'Author', icon: User },
  { value: 'subject', label: 'Subject', icon: Hash },
  { value: 'isbn', label: 'ISBN', icon: Barcode },
];

export function SearchBar({
  query,
  onQueryChange,
  searchType,
  onSearchTypeChange,
  onSearch,
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Search Type Selector */}
        <div className="flex flex-wrap gap-2">
          {searchTypes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => onSearchTypeChange(value)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all
                ${searchType === value
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={`Search books by ${searchType}...`}
            className="
              w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              text-lg placeholder-gray-500
              transition-all duration-200
            "
          />
        </div>

        {/* Search Tips */}
        <div className="text-xs text-gray-500">
          <strong>Tips:</strong> Try searching for popular titles like "Harry Potter", authors like "Stephen King", 
          subjects like "Science Fiction", or ISBN numbers for specific editions.
        </div>
      </form>
    </div>
  );
}