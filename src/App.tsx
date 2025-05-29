import React, { useState } from 'react';
import { useSacCodes, SacCode } from './data/sacCodes';
import SearchForm from './components/SearchForm';
import ValidationResult from './components/ValidationResult';
import SearchResults from './components/SearchResults';
import { validateCodeFormat, checkCodeExists, validateHierarchy } from './utils/validation';
import { searchByDescription, findCodeSuggestions } from './utils/search';
import { FileSpreadsheet, Search, AlertCircle } from 'lucide-react';

function App() {
  const { sacCodes, loading, error } = useSacCodes();
  const [searchQuery, setSearchQuery] = useState('');
  const [isCodeSearch, setIsCodeSearch] = useState(true);
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean;
    code: string;
    message: string;
    exactMatch?: SacCode;
    parentCodes?: SacCode[];
    suggestions?: SacCode[];
  } | null>(null);
  const [searchResults, setSearchResults] = useState<SacCode[]>([]);

  const handleSearch = (input: string, isCode: boolean) => {
    setSearchQuery(input);
    setIsCodeSearch(isCode);
    
    // Reset previous results
    setValidationResult(null);
    setSearchResults([]);

    if (isCode) {
      // Validate code format
      const formatValidation = validateCodeFormat(input);
      if (!formatValidation.isValid) {
        setValidationResult({
          isValid: false,
          code: input,
          message: formatValidation.message
        });
        return;
      }

      // Check if code exists
      const existsCheck = checkCodeExists(input, sacCodes);
      if (!existsCheck.exists) {
        // Find suggestions for invalid code
        const suggestions = findCodeSuggestions(input, sacCodes);
        
        setValidationResult({
          isValid: false,
          code: input,
          message: 'Code does not exist in the database',
          suggestions
        });
        return;
      }

      // For 8-digit codes, validate hierarchy
      const hierarchyValidation = validateHierarchy(input, sacCodes);
      
      setValidationResult({
        isValid: true,
        code: input,
        message: 'Valid code found in database',
        exactMatch: existsCheck.exactMatch,
        parentCodes: hierarchyValidation.parentCodes
      });
    } else {
      // Search by description
      const results = searchByDescription(input, sacCodes);
      setSearchResults(results);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <FileSpreadsheet className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">HSN/SAC Code Validator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enter an HSN/SAC code to validate or search by product/service description 
            to find the appropriate classification code.
          </p>
        </header>

        <SearchForm 
          onSearch={handleSearch} 
          isLoading={loading} 
        />

        {loading ? (
          <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-blue-200 rounded-full mb-4"></div>
              <div className="h-5 bg-blue-200 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-64"></div>
            </div>
          </div>
        ) : (
          <>
            {validationResult && (
              <ValidationResult {...validationResult} />
            )}
            
            {!isCodeSearch && searchResults && (
              <SearchResults results={searchResults} query={searchQuery} />
            )}
          </>
        )}

        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Data based on Service Accounting Codes (SAC) from the GST framework</p>
        </footer>
      </div>
    </div>
  );
}

export default App