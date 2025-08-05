import { BASE_URL_BACKEND } from "../../../const/api";

export const homeApi = {
  async fetchHomeMedia() {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/main-screen/`, {
        headers: {
          'X-Content-Type': 'media'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching home media:', error);
      throw error;
    }
  },

  async fetchHome(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/main-screen/`, {
        headers: {
          'Accept-Language': language === 'heb' ? 'he' : 'en'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching home:', error);
      throw error;
    }
  },

  async fetchWrittenAboutSlider(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/written-about-us-block`, {
        headers: {
          'Accept-Language': language === 'he' ? 'he' : 'en'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching written about slider:', error);
      throw error;
    }
  },

  async fetchWrittenAboutSliderMedia() {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/main-page/written-about-us-block`,{
        headers: {
          'X-Content-Type': 'media'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching written about slider media:', error);
      throw error;
    }
  }
};
