import { BASE_URL_BACKEND } from "../../../const/api";

export const mapPointsApi = {
  async getMapPoints(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/map-points/`, {
        headers: {
          'Accept-Language': language === 'heb' ? 'he' : 'en'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching map points:', error);
      throw error;
    }
  }
};
