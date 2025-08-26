export const selectHome = (state) => {
  const language = localStorage.getItem('language') === 'heb' ? 'he' : 'en';
  return state.content.home.data[language];
};
export const selectHomeAllLang = (state) => state.content.home.data;
export const selectHomeLoading = (state) => state.content.home.data.loading;
export const selectHomeError = (state) => state.content.home.data.error;

export const selectHomeMedia = (state) => state.content.home.media.content;
export const selectHomeMediaLoading = (state) => state.content.home.media.loading;
export const selectHomeMediaError = (state) => state.content.home.media.error;

// Written About Slider selectors
export const selectWrittenAboutSlider = (state,language) => {
  // const language = localStorage.getItem('language') === 'he' ? 'he' : 'en';
  return state.content.home.writtenAboutSlider[language];
};
export const selectWrittenAboutSliderLoading = (state) => state.content.home.writtenAboutSlider.loading;
export const selectWrittenAboutSliderError = (state) => state.content.home.writtenAboutSlider.error;

// Written About Slider Media selectors
export const selectWrittenAboutSliderMedia = (state) => state.content.home.writtenAboutSliderMedia.content;
export const selectWrittenAboutSliderMediaLoading = (state) => state.content.home.writtenAboutSliderMedia.loading;
export const selectWrittenAboutSliderMediaError = (state) => state.content.home.writtenAboutSliderMedia.error;
