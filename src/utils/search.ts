import { SacCode } from '../data/sacCodes';

/**
 * Calculate relevance score between a query and text
 * Higher score means better match
 */
const calculateRelevance = (query: string, text: string): number => {
  const queryWords = query.toLowerCase().split(/\s+/);
  const textLower = text.toLowerCase();
  
  let score = 0;
  
  // Exact match gives highest score
  if (textLower.includes(query.toLowerCase())) {
    score += 100;
  }
  
  // Word matches
  queryWords.forEach(word => {
    if (word.length < 3) return; // Skip very short words
    
    if (textLower.includes(word)) {
      score += 10;
      
      // Bonus for word boundary matches (full words)
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(textLower)) {
        score += 5;
      }
    }
  });
  
  return score;
};

/**
 * Search for codes by description
 */
export const searchByDescription = (
  query: string, 
  sacCodes: SacCode[]
): SacCode[] => {
  if (!query || query.trim().length < 2) {
    return [];
  }

  // Calculate relevance score for each code
  const scoredResults = sacCodes.map(code => ({
    ...code,
    score: calculateRelevance(query, code.description)
  }));
  
  // Filter results with a score > 0 and sort by descending score
  return scoredResults
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10) // Limit to top 10 results
    .map(({ code, description }) => ({ code, description }));
};

/**
 * Find potential suggestions for invalid codes
 */
export const findCodeSuggestions = (
  code: string, 
  sacCodes: SacCode[]
): SacCode[] => {
  // For codes that don't exist, find similar codes
  const codePrefix = code.substring(0, Math.min(code.length, 2));
  
  return sacCodes
    .filter(item => item.code.startsWith(codePrefix))
    .slice(0, 5); // Limit to 5 suggestions
};