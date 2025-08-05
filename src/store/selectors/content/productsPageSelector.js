// General reducers selectors
export const selectProductGeneral = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.productPage.productGeneral[lang];
};
export const selectProductGeneralLoading = (state) => 
  state.content.productPage.productGeneral.loading;

export const selectProductGeneralError = (state) => 
  state.content.productPage.productGeneral.error;


// General media reducers selectors
export const selectProductGeneralMedia = (state) => 
  state.content.productPage.productGeneralMedia.content;

export const selectProductGeneralMediaLoading = (state) => 
  state.content.productPage.productGeneralMedia.loading;

export const selectProductGeneralMediaError = (state) => 
  state.content.productPage.productGeneralMedia.error;


// Slides reducers selectors
export const selectProductSlides = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.productPage.productSlides[lang];
};
export const selectProductSlidesLoading = (state) => 
  state.content.productPage.productSlides.loading;

export const selectProductSlidesError = (state) => 
  state.content.productPage.productSlides.error;
