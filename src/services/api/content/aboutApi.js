import { BASE_URL_BACKEND } from "../../../const/api";

export const aboutApi = {
  async fetchAboutPageMainBlock(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/about-page/main-block`, {
        headers: {
          'Accept-Language': language
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching about page main block:', error);
      throw error;
    }
  },

  async fetchAAboutThesesBlocks(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/about-page/theses-block`, {
        headers: {
          'Accept-Language': language
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching about theses blocks:', error);
      throw error;
    }
  },

  async fetchAboutThesesBlocksMedia() {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/about-page/theses-block`, {
        headers: {
          'X-Content-Type': 'media'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching about theses media:', error);
      throw error;
    }
  },

  async fetchCustomizedSolutionsBlocks(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/about-page/custom-solutions-block`, {
        headers: {
          'Accept-Language': language
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching about page customized solutions blocks:', error);
      throw error;
    }
  },

  async fetchOurTeamBlocks(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/about-page/our-team-block`, {
        headers: {
          'Accept-Language': language
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching about our team blocks:', error);
      throw error;
    }
  },

  async fetchOurTeamBlocksMedia() {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/about-page/our-team-block`, {
        headers: {
          'X-Content-Type': 'media'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching about our team media:', error);
      throw error;
    }
  },

  async fetchLearnMoreBlocks(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/about-page/learn-more-block`, {
        headers: {
          'Accept-Language': language
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching about learn more blocks:', error);
      throw error;
    }
  },

  async fetchLearnMoreBlocksMedia() {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/about-page/learn-more-block`, {
        headers: {
          'X-Content-Type': 'media'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching about learn more media:', error);
      throw error;
    }
  },

  async fetchInviteBlocks(language) {
    try {
      const response = await fetch(`${BASE_URL_BACKEND}/about-page/invite-block`, {
        headers: {
          'Accept-Language': language
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching about invite blocks:', error);
      throw error;
    }
  }
};
