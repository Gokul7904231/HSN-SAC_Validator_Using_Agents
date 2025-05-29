import React from 'react';
import { SacCode } from '../data/sacCodes';
import { Search } from 'lucide-react';

interface SearchResultsProps {
  results: SacCode[];
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, query }) => {
  if (!query) return null;

  if (results.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <div className="text-gray-500 mb-2">
          <Search className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p className="text-lg">No results found for "{query}"</p>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Try using different keywords or a more general term
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-blue-100">
        <h3 className="text-lg font-semibold flex items-center">
          <Search className="h-5 w-5 mr-2 text-blue-600" />
          Search Results for "{query}"
        </h3>
        <p className="text-sm text-gray-600">
          Found {results.length} result{results.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="p-2">
        {results.map((result, index) => (
          <div 
            key={result.code} 
            className={`p-4 ${
              index < results.length - 1 ? "border-b border-gray-200" : ""
            } hover:bg-blue-50 transition-colors`}
          >
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="font-mono text-lg font-semibold w-32 mb-2 md:mb-0">
                {result.code}
              </div>
              <div className="flex-1">{result.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;