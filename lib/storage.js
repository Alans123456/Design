// Secure storage utilities for user data using browser storage

// Key for storing user data in localStorage
const USERS_STORAGE_KEY = 'users';

// Key for account lockout tracking
const LOCKOUT_STORAGE_KEY = 'account_lockouts';

// Import password hashing function
import { hashPassword } from './passwordUtils';

// Generate a secure random string for salt
const generateSalt = () => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Save a new user
export const saveUser = async (username, password) => {
  try {
    // Get existing users
    const existingUsers = getUsers();
    
    // Check if username already exists
    if (existingUsers.some(user => user.username === username)) {
      throw new Error('Username already exists');
    }
    
    // Generate salt
    const salt = generateSalt();
    
    // Hash password with salt
    const hashedPassword = await hashPassword(password + salt);
    
    // Create user object with security policies
    const newUser = {
      id: crypto.randomUUID(),
      username,
      hashedPassword,
      salt,
      createdAt: new Date().toISOString(),
      lastLogin: null,
      lastPasswordChange: new Date().toISOString(),
      passwordHistory: [hashedPassword], // Store password history to prevent reuse
      passwordExpiryDate: new Date(Date.now() + (90 * 24 * 60 * 60 * 1000)).toISOString(), // 90 days expiry
      failedLoginAttempts: 0,
      isLocked: false,
      securityQuestions: [],
      settings: {
        requireTwoFactor: false,
        passwordChangeReminders: true
      }
    };
    
    // Add new user to existing users
    existingUsers.push(newUser);
    
    // Save updated users list
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(existingUsers));
    
    // Return the new user (without sensitive data)
    const { hashedPassword: _, salt: __, passwordHistory: ___, ...safeUser } = newUser;
    return safeUser;
    
  } catch (error) {
    console.error('Error saving user:', error);
    throw new Error('Failed to create account. Please try again.');
  }
};

// Get all users
export const getUsers = () => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('Error getting users:', error);
    return [];
  }
};

// Check if a user exists
export const checkUserExists = (username) => {
  const users = getUsers();
  return users.some(user => user.username === username);
};

// Authenticate a user
export const authenticateUser = async (username, password) => {
  try {
    // Get users
    const users = getUsers();

    // Find user by username
    const user = users.find(user => user.username === username);

    // If user not found
    if (!user) {
      throw new Error('Invalid username or password');
    }

    // Decrypt the stored password using AES-GCM
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw",
      enc.encode("simple-static-key-1234"),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );
    const key = await window.crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: enc.encode("user-salt"),
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
    const iv = Uint8Array.from(atob(user.iv), c => c.charCodeAt(0));
    const encryptedPasswordBytes = Uint8Array.from(atob(user.password), c => c.charCodeAt(0));
    let decryptedPassword;
    try {
      const decrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedPasswordBytes
      );
      decryptedPassword = dec.decode(decrypted);
    } catch (e) {
      incrementFailedLoginAttempts(username);
      throw new Error('Invalid username or password');
    }

    // Compare decrypted password with input
    if (decryptedPassword !== password) {
      incrementFailedLoginAttempts(username);
      throw new Error('Invalid username or password');
    }

    // Reset failed login attempts
    resetFailedLoginAttempts(username);

    // Update last login
    updateLastLogin(username);

    // Return user without sensitive data
    const { password: _, iv: __, ...safeUser } = user;
    return safeUser;

  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};

// Increment failed login attempts
export const incrementFailedLoginAttempts = (username) => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.username === username);
    
    if (userIndex === -1) return;
    
    // Increment attempts
    users[userIndex].failedLoginAttempts += 1;
    
    // Lock account after 5 failed attempts
    if (users[userIndex].failedLoginAttempts >= 5) {
      users[userIndex].isLocked = true;
      
      // Set lockout expiry (30 minutes)
      const lockoutExpiryTime = new Date(Date.now() + (30 * 60 * 1000));
      
      // Save lockout info
      const lockoutInfo = {
        username,
        lockedAt: new Date().toISOString(),
        expiresAt: lockoutExpiryTime.toISOString(),
        reason: 'Too many failed login attempts'
      };
      
      saveAccountLockoutInfo(lockoutInfo);
    }
    
    // Save updated users
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
  } catch (error) {
    console.error('Error incrementing failed login attempts:', error);
  }
};

// Reset failed login attempts
export const resetFailedLoginAttempts = (username) => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.username === username);
    
    if (userIndex === -1) return;
    
    // Reset attempts
    users[userIndex].failedLoginAttempts = 0;
    
    // Save updated users
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
  } catch (error) {
    console.error('Error resetting failed login attempts:', error);
  }
};

// Update last login time
export const updateLastLogin = (username) => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.username === username);
    
    if (userIndex === -1) return;
    
    // Update last login
    users[userIndex].lastLogin = new Date().toISOString();
    
    // Save updated users
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
  } catch (error) {
    console.error('Error updating last login:', error);
  }
};

// Save account lockout information
export const saveAccountLockoutInfo = (lockoutInfo) => {
  try {
    const lockoutsJson = localStorage.getItem(LOCKOUT_STORAGE_KEY);
    const lockouts = lockoutsJson ? JSON.parse(lockoutsJson) : [];
    
    // Add new lockout info
    lockouts.push(lockoutInfo);
    
    // Save updated lockouts
    localStorage.setItem(LOCKOUT_STORAGE_KEY, JSON.stringify(lockouts));
    
  } catch (error) {
    console.error('Error saving account lockout info:', error);
  }
};

// Get account lockout information
export const getAccountLockoutInfo = (username) => {
  try {
    const lockoutsJson = localStorage.getItem(LOCKOUT_STORAGE_KEY);
    const lockouts = lockoutsJson ? JSON.parse(lockoutsJson) : [];
    
    // Find latest lockout for the username
    const userLockouts = lockouts.filter(lockout => lockout.username === username);
    
    if (userLockouts.length === 0) {
      return null;
    }
    
    // Sort by lockedAt timestamp (descending) and get the latest
    return userLockouts.sort((a, b) => new Date(b.lockedAt) - new Date(a.lockedAt))[0];
    
  } catch (error) {
    console.error('Error getting account lockout info:', error);
    return null;
  }
};

// Unlock a locked account
export const unlockAccount = (username) => {
  try {
    const users = getUsers();
    const userIndex = users.findIndex(user => user.username === username);
    
    if (userIndex === -1) return;
    
    // Unlock account
    users[userIndex].isLocked = false;
    users[userIndex].failedLoginAttempts = 0;
    
    // Save updated users
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
  } catch (error) {
    console.error('Error unlocking account:', error);
  }
};

// Change user password
export const changePassword = async (username, currentPassword, newPassword) => {
  try {
    // First authenticate with current password
    const user = await authenticateUser(username, currentPassword);
    
    if (!user) {
      throw new Error('Current password is incorrect');
    }
    
    const users = getUsers();
    const userIndex = users.findIndex(u => u.username === username);
    
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Check if new password is in password history (last 3 passwords)
    const newPasswordWithSalt = newPassword + users[userIndex].salt;
    const hashedNewPassword = await hashPassword(newPasswordWithSalt);
    
    const recentPasswords = users[userIndex].passwordHistory.slice(-3);
    
    if (recentPasswords.includes(hashedNewPassword)) {
      throw new Error('Cannot reuse one of your recent passwords');
    }
    
    // Update password
    users[userIndex].hashedPassword = hashedNewPassword;
    users[userIndex].lastPasswordChange = new Date().toISOString();
    users[userIndex].passwordExpiryDate = new Date(Date.now() + (90 * 24 * 60 * 60 * 1000)).toISOString();
    
    // Add to password history
    users[userIndex].passwordHistory.push(hashedNewPassword);
    
    // Keep only the last 5 passwords in history
    if (users[userIndex].passwordHistory.length > 5) {
      users[userIndex].passwordHistory = users[userIndex].passwordHistory.slice(-5);
    }
    
    // Save updated users
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    
    return true;
    
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};