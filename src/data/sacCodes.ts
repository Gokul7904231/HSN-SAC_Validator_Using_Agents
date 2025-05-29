import { useEffect, useState } from 'react';

export interface SacCode {
  code: string;
  description: string;
}

export const useSacCodes = () => {
  const [sacCodes, setSacCodes] = useState<SacCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSacCodes = async () => {
      try {
        const response = await fetch('/SAC_MSTR.csv');
        const csvText = await response.text();
        
        // Skip header row and parse CSV
        const rows = csvText.split('\n').slice(1);
        const parsedCodes: SacCode[] = [];
        
        for (const row of rows) {
          if (row.trim() === '') continue;
          
          // Handle cases where commas might be in the description
          const firstCommaIndex = row.indexOf(',');
          if (firstCommaIndex !== -1) {
            const code = row.substring(0, firstCommaIndex).trim();
            const description = row.substring(firstCommaIndex + 1).trim();
            
            if (code) {
              parsedCodes.push({ code, description });
            }
          }
        }
        
        setSacCodes(parsedCodes);
      } catch (err) {
        console.error('Error loading SAC codes:', err);
        setError('Failed to load SAC codes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadSacCodes();
  }, []);

  return { sacCodes, loading, error };
};