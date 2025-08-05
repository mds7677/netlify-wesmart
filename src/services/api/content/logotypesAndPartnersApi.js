import { BASE_URL_BACKEND } from "../../../const/api";

export const logotypesAndPartnersApi = {
  async fetchLogotypes(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/logotypes-block-cust`, {
        headers: {
          'Accept-Language': language
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching logotypes info:', error);
      throw error;
    }
  },

  async fetchLogotypesMedia() {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/logotypes-block-cust`,{
        headers: {
          'X-Content-Type': 'media'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching logotypes media:', error);
      throw error;
    }
  },

  async fetchPartners(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/logotypes-block-part`, {
        headers: {
          'Accept-Language': language
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching partners info:', error);
      throw error;
    }
  },

  async fetchPartnersMedia() {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/logotypes-block-part`,{
        headers: {
          'X-Content-Type': 'media'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching partners media:', error);
      throw error;
    }
  }
};
