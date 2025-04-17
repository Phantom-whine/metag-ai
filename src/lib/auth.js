import Cookies from 'js-cookie';
import axios from 'axios';
import { goto } from '$app/navigation';

const API_URL = 'https://metag-prod-api-ql90k.kinsta.app';
const COOKIE_CONFIG = {
  path: '/',
  sameSite: 'strict'
};

// Logger utility
const logger = {
  info: (message, data) => console.log(`[Auth] 📘 ${message}`, data || ''),
  error: (message, error) => console.error(`[Auth] ❌ ${message}`, error || ''),
  warn: (message, data) => console.warn(`[Auth] ⚠️ ${message}`, data || ''),
  success: (message, data) => console.log(`[Auth] ✅ ${message}`, data || '')
};

// Token management
export const isLoggedIn = () => !!Cookies.get('access');
export const getAccessToken = () => Cookies.get('access') || '';
export const getRefreshToken = () => Cookies.get('refresh') || '';

export const setTokens = (access, refresh) => {
  logger.info('Setting authentication tokens');
  
  Cookies.set('access', access, { 
    ...COOKIE_CONFIG, 
    expires: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
  });

  Cookies.set('refresh', refresh, {
    ...COOKIE_CONFIG,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  });
  
  logger.success('Tokens set successfully', { accessExpiry: new Date(Date.now() + 15 * 60 * 1000) });
};

export const clearTokens = () => {
  logger.info('Clearing all authentication tokens');
  ['access', 'refresh', 'profile'].forEach(key => Cookies.remove(key, { path: '/' }));
  stopTokenRefresh();
  goto('/');
  logger.success('Tokens cleared, user logged out');
};

// API client with automatic token refresh
export const apiClient = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const url = `${API_URL}${endpoint}`;
  logger.info(`API Request: ${options.method || 'GET'} ${url}`);

  try {
    const response = await axios({
      url,
      headers,
      ...options
    });
    logger.success(`API Request succeeded: ${url}`, { status: response.status });
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      logger.warn('Token expired, attempting refresh');
      const newAccess = await refreshToken();
      
      if (newAccess) {
        logger.info('Retrying request with new token');
        headers.Authorization = `Bearer ${newAccess}`;
        return axios({
          url,
          headers,
          ...options
        });
      }
    }
    
    logger.error(`API Request failed: ${url}`, {
      status: error.response?.status,
      message: error.message
    });
    throw error;
  }
};

// Auth operations
export const loginUser = async (access, refresh, profile, register = false) => {
  logger.info('Login process started');
  
  if (profile) {
    Cookies.set('profile', profile, COOKIE_CONFIG);
    logger.info('User profile saved to cookies');
  }
  
  setTokens(access, refresh);
  initializeAuth();
  
  if (!register) {
    logger.info('Redirecting to dashboard');
    goto('/dashboard');
  } else {
    logger.info('Redirecting to onboarding');
    localStorage.setItem('boarded', 'false');
    goto('/onboarding');
  }
  
  logger.success('User login completed successfully');
};

export const verifyToken = async () => {
  logger.info('Verifying authentication token');
  try {
    await apiClient('/api/auth/verify/');
    logger.success('Token verified successfully');
    return true;
  } catch (error) {
    logger.error('Token verification failed', error);
    clearTokens();
    return false;
  }
};

export const getCurrentUser = async () => {
  logger.info('Fetching current user data');
  try {
    const { data } = await apiClient('/api/auth/me/');
    logger.success('User data fetched successfully');
    return data;
  } catch (error) {
    logger.error('Failed to fetch user data', error);
    return null;
  }
};

export const refreshToken = async () => {
  const refresh = getRefreshToken();
  
  if (!refresh) {
    logger.warn('No refresh token available, logging out');
    clearTokens();
    return null;
  }

  logger.info('Attempting to refresh access token');
  
  try {
    const { data } = await axios.post(`${API_URL}/api/auth/refresh/`, { refresh });
    setTokens(data.access, data.refresh || refresh);
    logger.success('Token refreshed successfully');
    return data.access;
  } catch (error) {
    logger.error('Token refresh failed:', error);
    clearTokens();
    return null;
  }
};

// Token refresh system
let refreshInterval = null;

export const startTokenRefresh = () => {
  stopTokenRefresh();
  logger.info('Starting automatic token refresh cycle');

  const checkAndRefresh = async () => {
    const access = getAccessToken();
    const refresh = getRefreshToken();

    if (!access || !refresh) {
      logger.warn('Missing tokens, stopping refresh cycle');
      stopTokenRefresh();
      return;
    }

    try {
      await refreshToken();
    } catch (error) {
      logger.error('Scheduled token refresh failed', error);
      clearTokens();
    }
  };

  // Run immediately and every 3.33 minutes (200000ms)
  checkAndRefresh();
  refreshInterval = setInterval(checkAndRefresh, 200000);
  logger.info('Token refresh cycle started, interval: 3.33 minutes');
};

export const stopTokenRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
    logger.info('Token refresh cycle stopped');
  }
};

// Initialize on app load
export const initializeAuth = () => {
  logger.info('Initializing authentication system');
  if (getRefreshToken()) {
    logger.info('Refresh token found, starting refresh cycle');
    startTokenRefresh();
  } else {
    logger.info('No refresh token found, user not logged in');
  }
};