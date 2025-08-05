import { BASE_URL_BACKEND } from "../../../const/api";

export const prevClientsApi = {
  async fetchPrevClients(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/prev-clients/`, {
        headers: {
          'Accept-Language': language === 'heb' ? 'he' : 'en'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching prev clients:', error);
      throw error;
    }
  }
};
