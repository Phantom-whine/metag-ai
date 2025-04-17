import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const ssr = false;

export function load({ parent }) {
    // Only check localStorage when running in the browser
    if (browser && localStorage.getItem('boarded') === 'true') {
        throw redirect(307, '/dashboard');
    }
}