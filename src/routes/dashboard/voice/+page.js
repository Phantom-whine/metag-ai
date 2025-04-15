import Cookies from 'js-cookie';

export async function load({ fetch }) {
    let access = Cookies.get('access');
    try {
        const response = await fetch(`https://metag-prod-api-ql90k.kinsta.app/api/voice/get/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        return {
            apiData: responseData,
            error: null
        };
        
    } catch (error) {
        console.error('API call failed:', error);
        return {
            status: 500,
            apiData: null,
            error: 'Failed to fetch data from the API'
        };
    }
}