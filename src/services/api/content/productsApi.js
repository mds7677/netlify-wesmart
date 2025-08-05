import { BASE_URL_BACKEND } from "../../../const/api";

export const productsApi = {
  async fetchProductsDescription(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/product-page/description/`, {
        headers: {
          'Accept-Language': language === 'heb' ? 'he' : 'en'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching products description:', error);
      throw error;
    }
  },

  async fetchProductsSlider(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/product-page/`, {
        headers: {
          'Accept-Language': language === 'heb' ? 'he' : 'en'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching products slider:', error);
      throw error;
    }
  },

  async fetchProductDetailsGeneral(slug, language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/product-page/${slug}/general`, {
        headers: {
          'Accept-Language': language === 'heb' ? 'he' : 'en'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching product details general:', error);
      throw error;
    }
  },

  async fetchProductDetailsGeneralMedia(slug) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/product-page/${slug}/general/media`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product details general media:', error);
      throw error;
    }
  },

  async fetchProductDetailsCards(slug, language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/product-page/${slug}/cards`, {
        headers: {
          'Accept-Language': language === 'heb' ? 'he' : 'en'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching product details cards:', error);
      throw error;
    }
  }
};
