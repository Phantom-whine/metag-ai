import { redirect } from '@sveltejs/kit';

export async function load({ fetch, cookies }) {
  let accessToken = cookies.get('access');
  const refreshToken = cookies.get('refresh');
  const API_URL = 'https://metag-prod-api-ql90k.kinsta.app';

  // Attempt token refresh if access is missing but refresh exists
  if (!accessToken && refreshToken) {
    try {
      // Try to refresh access token
      const refreshRes = await fetch(
        `${API_URL}/api/auth/refresh/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken })
        }
      );

      if (!refreshRes.ok) throw redirect(307, '/');

      const { access } = await refreshRes.json();
      accessToken = access;
      cookies.set('access', access, { 
        path: '/', 
        expires: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
      });
    } catch (error) {
      cookies.delete('access', { path: '/' });
      cookies.delete('refresh', { path: '/' });
      cookies.delete('profile', {path: '/'});
      throw redirect(307, '/login');
    }
  }

  // If no valid access token after potential refresh
  if (!accessToken) {
    return { user: null };
  }

  try {
    // Verify the (potentially new) access token
    const verifyRes = await fetch(
      `${API_URL}/api/auth/verify/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: accessToken })
      }
    );

    if (!verifyRes.ok) throw redirect(307, '/login');

    // Get user data with valid token
    const userRes = await fetch(
      `${API_URL}/api/auth/me/`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );

    return { user: await userRes.json() };
  } catch (error) {
      cookies.delete('access', { path: '/' });
      cookies.delete('refresh', { path: '/' });
      cookies.delete('profile', {path: '/'});
      throw redirect(307, '/login');
  }
}