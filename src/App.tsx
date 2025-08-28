import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Filter, Star, ExternalLink, Calendar, User, Hash } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { BookGrid } from './components/BookGrid';
import { BookModal } from './components/BookModal';
import { FilterPanel } from './components/FilterPanel';
import { Book } from './types/Book';
import { searchBooks } from './services/bookService';
import { useDebounce } from './hooks/useDebounce';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('relevance');
  
  const debouncedQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      handleSearch();
    } else {
      setBooks([]);
      setError(null);
    }
  }, [debouncedQuery, searchType, sortBy]);

  const handleSearch = async () => {
    if (!debouncedQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const results = await searchBooks(debouncedQuery, searchType);
      setBooks(results);
      
      if (results.length === 0) {
        setError('No books found. Try a different search term or search type.');
      }
    } catch (err) {
      setError('Failed to search books. Please check your connection and try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (bookKey: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(bookKey)) {
      newFavorites.delete(bookKey);
    } else {
      newFavorites.add(bookKey);
    }
    setFavorites(newFavorites);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">BookFinder</h1>
                <p className="text-sm text-gray-600">Discover your next great read</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            searchType={searchType}
            onSearchTypeChange={setSearchType}
            onSearch={handleSearch}
          />
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8">
            <FilterPanel
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalResults={books.length}
            />
          </div>
        )}

        {/* Results Section */}
        <div className="space-y-6">
          {/* Results Header */}
          {(books.length > 0 || loading || error) && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {loading ? 'Searching...' : `${books.length} books found`}
                </h2>
                {searchQuery && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>for</span>
                    <span className="font-medium text-blue-600">"{searchQuery}"</span>
                    <span>in</span>
                    <span className="capitalize font-medium text-teal-600">{searchType}</span>
                  </div>
                )}
              </div>
              
              {favorites.size > 0 && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-amber-500" />
                  <span>{favorites.size} favorites</span>
                </div>
              )}
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-lg font-medium text-red-900 mb-2">Oops!</h3>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && books.length === 0 && !searchQuery && (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Ready to discover books?</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Search for books by title, author, subject, or ISBN. Start typing to see results instantly.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                  <Search className="h-4 w-4 text-blue-600" />
                  <span>Try: "The Great Gatsby"</span>
                </div>
                <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                  <User className="h-4 w-4 text-teal-600" />
                  <span>Or: "Jane Austen"</span>
                </div>
                <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm">
                  <Hash className="h-4 w-4 text-orange-600" />
                  <span>Or: "Science Fiction"</span>
                </div>
              </div>
            </div>
          )}

          {/* Books Grid */}
          {books.length > 0 && (
            <BookGrid
              books={books}
              favorites={favorites}
              onBookSelect={setSelectedBook}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </div>
      </main>

      {/* Book Modal */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          isFavorite={favorites.has(selectedBook.key)}
          onClose={() => setSelectedBook(null)}
          onToggleFavorite={() => toggleFavorite(selectedBook.key)}
        />
      )}
    </div>
  );
}

export default App;