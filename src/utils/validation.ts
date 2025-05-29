/**
 * Validates if the input string is a valid HSN/SAC code format
 * @param code The code to validate
 * @returns Validation result with status and message
 */
export const validateCodeFormat = (code: string): { isValid: boolean; message: string } => {
  // Check if code contains only digits
  if (!/^\d+$/.test(code)) {
    return { 
      isValid: false, 
      message: 'Code must contain only numeric digits'
    };
  }

  // Check if code length is 2, 4, 6, or 8 digits
  const validLengths = [2, 4, 6, 8];
  if (!validLengths.includes(code.length)) {
    return { 
      isValid: false, 
      message: 'Code must be 2, 4, 6, or 8 digits long'
    };
  }

  return { 
    isValid: true, 
    message: 'Valid code format' 
  };
};

/**
 * Checks if a code exists in the database
 * @param code The code to check
 * @param sacCodes Array of SAC codes from database
 * @returns Existence check result
 */
export const checkCodeExists = (
  code: string, 
  sacCodes: Array<{ code: string; description: string }>
): { exists: boolean; exactMatch?: { code: string; description: string } } => {
  const exactMatch = sacCodes.find(item => item.code === code);
  
  return {
    exists: !!exactMatch,
    exactMatch
  };
};

/**
 * Validates hierarchical relationship for 8-digit codes
 * @param code The 8-digit code to validate
 * @param sacCodes Array of SAC codes from database
 * @returns Hierarchy validation result
 */
export const validateHierarchy = (
  code: string, 
  sacCodes: Array<{ code: string; description: string }>
): { isValid: boolean; message: string; parentCodes?: Array<{ code: string; description: string }> } => {
  if (code.length !== 8) {
    return { isValid: true, message: 'Not an 8-digit code, hierarchy check skipped' };
  }

  const parentCodes = [];
  
  // Check 6-digit parent
  const sixDigitParent = code.substring(0, 6);
  const sixDigitExists = sacCodes.find(item => item.code === sixDigitParent);
  if (sixDigitExists) {
    parentCodes.push(sixDigitExists);
  }
  
  // Check 4-digit parent
  const fourDigitParent = code.substring(0, 4);
  const fourDigitExists = sacCodes.find(item => item.code === fourDigitParent);
  if (fourDigitExists) {
    parentCodes.push(fourDigitExists);
  }
  
  // Check 2-digit parent
  const twoDigitParent = code.substring(0, 2);
  const twoDigitExists = sacCodes.find(item => item.code === twoDigitParent);
  if (twoDigitExists) {
    parentCodes.push(twoDigitExists);
  }

  if (parentCodes.length === 0) {
    return { 
      isValid: false, 
      message: 'No valid parent codes found in hierarchy' 
    };
  }

  return { 
    isValid: true, 
    message: 'Valid hierarchy', 
    parentCodes 
  };
};