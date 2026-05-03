import axios from 'axios';

// RapidAPI Setup (Sirf external jobs search karne ke liye)
const RAPID_KEY = import.meta.env.VITE_RAPID_API_KEY || '5f3c1cbcbfmshd805f38a4540e89p16e04ajsnf844f46eeb47';

const rapidAPI = axios.create({
    baseURL: 'https://jsearch.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': RAPID_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
});

// --- EXTERNAL REAL JOBS API CALL ---
// Yeh function aapke "Explore Jobs" page par live jobs dikhayega
export const searchRealJobs = async (query) => {
    try {
        const response = await rapidAPI.get('/search', { 
            params: { query: query || 'React Developer', num_pages: '1' } 
        });
        return response.data.data; 
    } catch (error) {
        console.error("RapidAPI Error:", error);
        return [];
    }
};