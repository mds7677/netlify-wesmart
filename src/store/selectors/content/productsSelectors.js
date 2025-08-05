export const selectProductsDescription = (state, language) => {
  const lang = language === 'heb' ? 'he' : 'en';
  return state.content.products.productsDescription[lang];
};

export const selectProductsDescriptionLoading = (state) => 
  state.content.products.productsDescription.loading;

export const selectProductsDescriptionError = (state) => 
  state.content.products.productsDescription.error;

export const selectProductsSlider = (state, language) => {
  const lang = language === 'heb' ? 'he' : 'en';
  return state.content.products.productsSlider[lang];
};

export const selectProductsSliderLoading = (state) => 
  state.content.products.productsSlider.loading;

export const selectProductsSliderError = (state) => 
  state.content.products.productsSlider.error;

export const selectProductDetailsGeneral = (state, language, slug) => {
  const lang = language === 'heb' ? 'he' : 'en';
  return state.content.products.productsDetails.general.data.bySlug[slug]?.[lang];
};

export const selectProductDetailsGeneralMedia = (state, slug) => 
  state.content.products.productsDetails.general.media.bySlug[slug];

export const selectProductDetailsCards = (state, language, slug) => {
  const lang = language === 'heb' ? 'he' : 'en';
  return state.content.products.productsDetails.cards.data.bySlug[slug]?.[lang];
};
