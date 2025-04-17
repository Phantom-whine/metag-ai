import Cookies from 'js-cookie';
import axios from 'axios';
import { goto } from '$app/navigation';

const API_URL = import.meta.env.VITE_DJANGO_API_URL;

function setCookie(name, value, minutes) {
  const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}


// Token management
export const isLoggedIn = () => !!Cookies.get('access');
export const getAccessToken = () => Cookies.get('access') || '';
export const getRefreshToken = () => Cookies.get('refresh') || '';

export const setTokens = (access, refresh) => {
  console.log('saved')
  // Cookies.set('access', access, { 
  //   path: '/', 
  //   sameSite: 'Strict',
  //   expires: new Date(Date.now() + 15 * 60 * 1000)
  // });
  setCookie('access', access, 15); // 15 minutes

  // Cookies.set('refresh', refresh, {
  //   path: '/',
  //   sameSite: 'Strict',
  //   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  // });
  setCookie('refresh',refresh, 7 * 24 * 60);
};

export const clearTokens = () => {
  Cookies.remove('access', { path: '/' });
  Cookies.remove('refresh', { path: '/' });
  Cookies.remove('profile', { path: '/' });
  stopTokenRefresh();
  goto('/');
};


// Enhanced API client
export const apiClient = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  try {
    const response = await axios({
      url: `${API_URL}${endpoint}`,
      headers,
      ...options
    });
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      const newAccess = await refreshToken();
      if (newAccess) {
        headers.Authorization = `Bearer ${newAccess}`;
        return axios({
          url: `${API_URL}${endpoint}`,
          headers,
          ...options
        });
      }
    }
    throw error;
  }
};

// Auth operations
export const loginUser = async (access, refresh, profile, register) => {
  if(profile){
    // Cookies.set('profile', profile)
    setCookie('profile', profile);
  }
  setTokens(access, refresh);
  initializeAuth();
  if(!register){
    goto('/dashboard');
  }else{
    localStorage.setItem('boarded', 'false')
    goto('/dashboard/onboarding')
  }
};

export const verifyToken = async () => {
  try {
    await apiClient('/api/auth/verify/');
    return true;
  } catch {
    clearTokens();
    return false;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await apiClient('/api/auth/me/');
    return data;
  } catch {
    return null;
  }
};

export const refreshToken = async () => {
  try {
    const refresh = getRefreshToken();
    if (!refresh) {
      clearTokens();
      return null;
    }

    const { data } = await axios.post(`${API_URL}/api/auth/refresh/`, { refresh });
    setTokens(data.access, data.refresh || refresh);
    return data.access;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();
    return null;
  }
};

// Token refresh system
let refreshInterval = null;

export const startTokenRefresh = () => {
  stopTokenRefresh();

  const checkAndRefresh = async () => {
    const access = getAccessToken();
    const refresh = getRefreshToken();

    if (!access || !refresh) {
      stopTokenRefresh();
      return;
    }

    try {
      await refreshToken();
      console.log('Token refreshed successfully');
    } catch (error) {
      console.error('Token check error:', error);
      clearTokens();
    }
  };

  // Run immediately and every 5 minutes
  checkAndRefresh();
  refreshInterval = setInterval(checkAndRefresh, 200000); // 5 minutes
};

export const stopTokenRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
};

// Initialize on app load
export const initializeAuth = () => {
  if (getRefreshToken()) {
    startTokenRefresh();
  }
};