export const selectContacts = (state) => {
  const language = localStorage.getItem('language') === 'heb' ? 'he' : 'en';
  return state.content.contacts.data[language];
};

export const selectContactsLoading = (state) => state.content.contacts.data.loading;
export const selectContactsError = (state) => state.content.contacts.data.error;

// Common contacts selectors
export const selectCommonContacts = (state) => state.content.contacts.commonContacts.data;
export const selectCommonContactsLoading = (state) => state.content.contacts.commonContacts.loading;
export const selectCommonContactsError = (state) => state.content.contacts.commonContacts.error;

export const selectContactsAllLang = (state) => state.content.contacts.data;
export const selectContactsMedia = (state) => state.content.contacts.media.content;
export const selectContactsMediaLoading = (state) => state.content.contacts.media.loading;
export const selectContactsMediaError = (state) => state.content.contacts.media.error;
