import { BASE_URL_BACKEND } from "../../../const/api";

export const productPageApi = {
  async fetchFullSlides(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/product-page/page/full-slides/`, {
        headers: {
          'Accept-Language': language
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching full slides:', error);
      throw error;
    }
  },

  async fetchGeneralInfo(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/product-page/page/general/`, {
        headers: {
          'Accept-Language': language
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching general info:', error);
      throw error;
    }
  },

  async fetchGeneralMedia() {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/product-page/page/general/media/`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching general media:', error);
      throw error;
    }
  }
};
