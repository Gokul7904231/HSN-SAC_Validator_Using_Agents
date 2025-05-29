import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (input: string, isCode: boolean) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [input, setInput] = useState('');
  const [searchType, setSearchType] = useState<'code' | 'description'>('code');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim(), searchType === 'code');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-6">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              name="searchType"
              checked={searchType === 'code'}
              onChange={() => setSearchType('code')}
            />
            <span className="ml-2 text-gray-700">Search by Code</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              className="form-radio h-5 w-5 text-blue-600"
              name="searchType"
              checked={searchType === 'description'}
              onChange={() => setSearchType('description')}
            />
            <span className="ml-2 text-gray-700">Search by Description</span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type={searchType === 'code' ? 'text' : 'search'}
            placeholder={searchType === 'code' 
              ? "Enter HSN/SAC code (e.g., 9954)" 
              : "Enter product or service description"
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md transition-colors disabled:bg-blue-400"
            disabled={isLoading || !input.trim()}
          >
            <Search size={20} />
          </button>
        </form>

        <p className="text-sm text-gray-500 italic">
          {searchType === 'code' 
            ? "HSN/SAC codes should be 2, 4, 6, or 8 digits" 
            : "Enter keywords related to the product or service"
          }
        </p>
      </div>
    </div>
  );
};

export default SearchForm;