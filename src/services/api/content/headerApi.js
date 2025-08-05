import { BASE_URL_BACKEND } from "../../../const/api";

export const headerApi = {
  async fetchHeaderMedia() {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/header/`, {
        headers: {
          'X-Content-Type': 'media'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching header media:', error);
      throw error;
    }
  },

  async fetchHeader(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/header/`, {
        headers: {
          'Accept-Language': language === 'heb' ? 'he' : 'en'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching header:', error);
      throw error;
    }
  }
};
