import { BASE_URL_BACKEND } from "../../../const/api";

export const careerPageApi = {
  async fetchCareerPageTopBlok(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/career-page/career-page-top-block/`, {
        headers: {
          'Accept-Language': language
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching career page top block info:', error);
      throw error;
    }
  },

  async fetchCareerPageMedia() {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/career-page/career-page-top-block/`,{
        headers: {
          'X-Content-Type': 'media'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching career page top block media:', error);
      throw error;
    }
  },
  
  async fetchCareerPageOurMission(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/career-page/our-mission-block/`, {
        headers: {
          'Accept-Language': language
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching career page our mission info:', error);
      throw error;
    }
  },

  async fetchWhyUs(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/career-page/why-choose-wesmart-block/`, {
        headers: {
          'Accept-Language': language
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching career page why us info:', error);
      throw error;
    }
  },

  async fetchEmployeeBenefits(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/career-page/employee-benefits-block/`, {
        headers: {
          'Accept-Language': language
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching career page employee benefits info:', error);
      throw error;
    }
  },

  async fetchJoinUs(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/career-page/join-us-block/`, {
        headers: {
          'Accept-Language': language
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching career page join us info:', error);
      throw error;
    }
  }
};
