export const selectFooter = (state, language) => {
  const lang = language === 'heb' ? 'he' : 'en';
  return state.content.footer.data[lang];
};
export const selectFooterAllLang = (state) => state.content.footer.data;
export const selectFooterLoading = (state) => state.content.footer.data.loading;
export const selectFooterError = (state) => state.content.footer.data.error;
