import { BASE_URL_BACKEND } from '../../../const/api';

export const contactsApi = {
  async fetchContacts(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/contact-page/`, {
        headers: {
          'Accept-Language': language,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },
  async fetchCommonContacts(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/contact-page/contact-common/`, {
        headers: {
          'Accept-Language': language,
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching common contacts:', error);
      throw error;
    }
  },
};
