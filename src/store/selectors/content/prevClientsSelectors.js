export const selectPrevClients = (state, language) => {
  const lang = language === 'heb' ? 'he' : 'en';
  return state.content.prevClients.data[lang];
};
export const selectPrevClientsAllLang = (state) => state.content.prevClients.data;
export const selectPrevClientsLoading = (state) => state.content.prevClients.data.loading;
export const selectPrevClientsError = (state) => state.content.prevClients.data.error;

export const selectPrevClientsMedia = (state) => state.content.prevClients.media.content;
export const selectPrevClientsMediaLoading = (state) => state.content.prevClients.media.loading;
export const selectPrevClientsMediaError = (state) => state.content.prevClients.media.error;
