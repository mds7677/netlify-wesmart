// Text content selectors
export const selectHeader = (state, language) => {
  const lang = language === 'heb' ? 'he' : 'en';
  return state.content.header.data[lang];
};
export const selectHeaderAllLang = (state) => state.content.header.data;
export const selectHeaderLoading = (state) => state.content.header.data.loading;
export const selectHeaderError = (state) => state.content.header.data.error;

// Media selectors
export const selectHeaderMedia = (state) => state.content.header.media.content;
export const selectHeaderMediaLoading = (state) => state.content.header.media.loading;
export const selectHeaderMediaError = (state) => state.content.header.media.error;
