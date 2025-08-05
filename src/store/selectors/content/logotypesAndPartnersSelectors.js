 // Logotypes reducers selectors
export const selectLogotypes = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.logotypesAndPartners.logotypes[lang];
};

export const selectLogotypesLoading = (state) => 
  state.content.logotypesAndPartners.logotypes.loading;

export const selectLogotypesError = (state) => 
  state.content.logotypesAndPartners.logotypes.error;

// Logotypes media reducers selectors
export const selectLogotypesMedia = (state) => 
  state.content.logotypesAndPartners.logotypesMedia.content;

export const selectLogotypesMediaLoading = (state) => 
  state.content.logotypesAndPartners.logotypesMedia.loading;

export const selectLogotypesMediaError = (state) => 
  state.content.logotypesAndPartners.logotypesMedia.error;

// Partners reducers selectors
export const selectPartners = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.logotypesAndPartners.partners[lang];
};

export const selectPartnersLoading = (state) => 
  state.content.logotypesAndPartners.partners.loading;

export const selectPartnersError = (state) => 
  state.content.logotypesAndPartners.partners.error;

// Partners media reducers selectors
export const selectPartnersMedia = (state) => 
  state.content.logotypesAndPartners.partnersMedia.content;

export const selectPartnersMediaLoading = (state) => 
  state.content.logotypesAndPartners.partnersMedia.loading;

export const selectPartnersMediaError = (state) => 
  state.content.logotypesAndPartners.partnersMedia.error;