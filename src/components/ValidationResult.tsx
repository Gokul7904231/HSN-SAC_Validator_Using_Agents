import React from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';
import { SacCode } from '../data/sacCodes';

interface ValidationResultProps {
  isValid: boolean;
  code: string;
  message: string;
  exactMatch?: SacCode;
  parentCodes?: SacCode[];
  suggestions?: SacCode[];
}

const ValidationResult: React.FC<ValidationResultProps> = ({
  isValid,
  code,
  message,
  exactMatch,
  parentCodes,
  suggestions,
}) => {
  if (!code) return null;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className={`p-4 flex items-center ${isValid ? 'bg-green-100' : 'bg-red-100'}`}>
        {isValid ? (
          <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
        ) : (
          <XCircle className="h-6 w-6 text-red-600 mr-2" />
        )}
        <h3 className="text-lg font-semibold">
          {isValid ? 'Valid Code' : 'Invalid Code'}
        </h3>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="font-medium text-gray-700 mb-1 sm:mb-0 sm:w-24">Code:</div>
          <div className="font-mono text-lg">{code}</div>
        </div>

        <div className="flex flex-col sm:flex-row">
          <div className="font-medium text-gray-700 mb-1 sm:mb-0 sm:w-24">Status:</div>
          <div className={isValid ? "text-green-600" : "text-red-600"}>
            {message}
          </div>
        </div>

        {exactMatch && (
          <div className="flex flex-col">
            <div className="font-medium text-gray-700 mb-1">Description:</div>
            <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
              {exactMatch.description}
            </div>
          </div>
        )}

        {parentCodes && parentCodes.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 flex items-center mb-2">
              <Info className="h-5 w-5 mr-1 text-blue-500" />
              Parent Codes in Hierarchy:
            </h4>
            <div className="space-y-2">
              {parentCodes.map((parent) => (
                <div
                  key={parent.code}
                  className="bg-gray-50 border border-gray-200 rounded-md p-3"
                >
                  <div className="font-mono font-semibold mb-1">{parent.code}</div>
                  <div className="text-sm text-gray-700">{parent.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {suggestions && suggestions.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium text-gray-700 flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 mr-1 text-amber-500" />
              Suggested Codes:
            </h4>
            <div className="space-y-2">
              {suggestions.map((suggestion) => (
                <div
                  key={suggestion.code}
                  className="bg-amber-50 border border-amber-100 rounded-md p-3"
                >
                  <div className="font-mono font-semibold mb-1">{suggestion.code}</div>
                  <div className="text-sm text-gray-700">{suggestion.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ValidationResult;