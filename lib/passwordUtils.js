// Password strength analysis utilities

// Common password patterns to check against
const COMMON_PATTERNS = [
  /^123456/, /password/, /qwerty/, /admin/, /welcome/,
  /12345678/, /abc123/, /football/, /1234567/, /monkey/,
  /letmein/, /login/, /princess/, /solo/, /batman/,
  /superman/, /master/, /baseball/, /dragon/, /sunshine/
];

// Check if password contains sequential characters
const hasSequentialChars = (password) => {
  const sequences = ['abcdefghijklmnopqrstuvwxyz', '01234567890', 'qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  
  for (const seq of sequences) {
    for (let i = 0; i < seq.length - 2; i++) {
      const pattern = seq.substring(i, i + 3);
      if (password.toLowerCase().includes(pattern)) {
        return true;
      }
    }
  }
  
  return false;
};

// Calculate entropy (randomness) of password
const calculateEntropy = (password) => {
  // Shannon entropy calculation
  const len = password.length;
  
  // Count character frequencies
  const charFreq = {};
  for (let i = 0; i < len; i++) {
    const char = password[i];
    charFreq[char] = (charFreq[char] || 0) + 1;
  }
  
  // Calculate entropy
  let entropy = 0;
  for (const char in charFreq) {
    const freq = charFreq[char] / len;
    entropy -= freq * (Math.log(freq) / Math.log(2));
  }
  
  return entropy;
};

// Analyze password strength
export const analyzePassword = (password) => {
  const strength = {
    score: 0, // 0-4 scale
    feedback: []
  };
  
  if (!password) {
    strength.feedback.push('Please enter a password.');
    return strength;
  }

  // Check length
  if (password.length < 8) {
    strength.feedback.push('Password should be at least 8 characters long.');
  } else if (password.length >= 16) {
    strength.score += 1;
  }
  
  // Check character variety
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  
  let varietyCount = 0;
  if (hasLowercase) varietyCount++;
  if (hasUppercase) varietyCount++;
  if (hasNumbers) varietyCount++;
  if (hasSpecial) varietyCount++;
  
  strength.score += Math.min(varietyCount, 2);
  
  if (!hasLowercase) {
    strength.feedback.push('Add lowercase letters.');
  }
  
  if (!hasUppercase) {
    strength.feedback.push('Add uppercase letters.');
  }
  
  if (!hasNumbers) {
    strength.feedback.push('Add numbers.');
  }
  
  if (!hasSpecial) {
    strength.feedback.push('Add special characters (!@#$%^&*).');
  }
  
  // Check for common patterns
  if (COMMON_PATTERNS.some(pattern => pattern.test(password.toLowerCase()))) {
    strength.feedback.push('Avoid common password patterns.');
    strength.score = Math.max(0, strength.score - 1);
  }
  
  // Check for sequential characters
  if (hasSequentialChars(password)) {
    strength.feedback.push('Avoid sequential characters (abc, 123, qwerty).');
    strength.score = Math.max(0, strength.score - 1);
  }
  
  // Check entropy
  const entropy = calculateEntropy(password);
  if (entropy > 3.5) {
    strength.score = Math.min(4, strength.score + 1);
  }
  
  // Check for repeated characters
  if (/(.)\1{2,}/.test(password)) {
    strength.feedback.push('Avoid repeating characters.');
    strength.score = Math.max(0, strength.score - 1);
  }
  
  // Final score adjustments
  if (password.length >= 12 && varietyCount >= 3 && entropy > 3 && !hasSequentialChars(password)) {
    strength.score = Math.max(strength.score, 3);
  }
  
  if (password.length >= 16 && varietyCount === 4 && entropy > 4) {
    strength.score = 4;
  }
  
  // Make sure score is within bounds
  strength.score = Math.max(0, Math.min(4, strength.score));
  
  // Add general advice if there's no specific feedback but score is still low
  if (strength.feedback.length === 0 && strength.score < 3) {
    strength.feedback.push('Consider making your password longer and more complex.');
  }
  
  return strength;
};

// Hash password (client-side hashing for storage)
export const hashPassword = async (password) => {
  // In a real production system, we would hash on the server
  // This is a simplified version for demonstration
  try {
    // Convert string to Uint8Array
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    
    // Get hash using SubtleCrypto
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    
    // Convert buffer to hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Password hashing failed');
  }
};