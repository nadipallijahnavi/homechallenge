import React from 'react';
import { ChevronDown, SortAsc, Calendar, Star } from 'lucide-react';

interface FilterPanelProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
  totalResults: number;
}

const sortOptions = [
  { value: 'relevance', label: 'Relevance', icon: SortAsc },
  { value: 'title', label: 'Title A-Z', icon: SortAsc },
  { value: 'newest', label: 'Newest First', icon: Calendar },
  { value: 'oldest', label: 'Oldest First', icon: Calendar },
];

export function FilterPanel({ sortBy, onSortChange, totalResults }: FilterPanelProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="
                appearance-none bg-white border border-gray-300 rounded-lg
                px-3 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent
                cursor-pointer
              "
            >
              {sortOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="text-sm text-gray-600">
          {totalResults} results
        </div>
      </div>
    </div>
  );
}