import { BASE_URL_BACKEND } from "../../../const/api";

export const fetchFooter = async (language) => {
  try {
    const response = await fetch(`${BASE_URL_BACKEND}/main-page/footer/`, {
      headers: {
        'Accept-Language': language === 'heb' ? 'he' : 'en'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch footer');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching footer:', error);
    throw error;
  }
};
