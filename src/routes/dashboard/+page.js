import { redirect } from '@sveltejs/kit';
import { browser } from '$app/environment';

export const ssr = false;

export function load({ parent }) {
    return parent().then(({ user }) => {
        if (!user) throw redirect(307, '/login');
        
        // Only check localStorage when running in the browser
        if (browser && localStorage.getItem('boarded') === 'false') {
            throw redirect(307, '/dashboard/onboarding');
        }
    });
}