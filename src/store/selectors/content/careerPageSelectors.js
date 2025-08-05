// Career Page Top Block selectors 
export const selectCareerPageTopBlok = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.careerPage.careerPageTopBlok[lang];
};
export const selectCareerPageTopBlokLoading = (state) => state.content.careerPage.careerPageTopBlok.loading;
export const selectCareerPageTopBlokError = (state) => state.content.careerPage.careerPageTopBlok.error;

// Career Page Top Block Media selectors
export const selectCareerPageTopBlokMedia = (state) => {
  return state.content.careerPage.careerPageTopBlokMedia.content;
};
export const selectCareerPageTopBlokMediaLoading = (state) => state.content.careerPage.careerPageTopBlokMedia.loading;
export const selectCareerPageTopBlokMediaError = (state) => state.content.careerPage.careerPageTopBlokMedia.error;

// Career Page Our Mission selectors
export const selectCareerPageOurMission = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.careerPage.careerPageOurMission[lang];
};
export const selectCareerPageOurMissionLoading = (state) => state.content.careerPage.careerPageOurMission.loading;
export const selectCareerPageOurMissionError = (state) => state.content.careerPage.careerPageOurMission.error;

// Career Page Why Us selectors
export const selectCareerPageWhyUs = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.careerPage.whyChooseWeSmart[lang];
};
export const selectCareerPageWhyUsLoading = (state) => state.content.careerPage.whyChooseWeSmart.loading;
export const selectCareerPageWhyUsError = (state) => state.content.careerPage.whyChooseWeSmart.error;

// Employee Benefits selectors
export const selectEmployeeBenefits = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.careerPage.EmployeeBenefits[lang];
};
export const selectEmployeeBenefitsLoading = (state) => state.content.careerPage.EmployeeBenefits.loading;
export const selectEmployeeBenefitsError = (state) => state.content.careerPage.EmployeeBenefits.error;

// Join Us selectors
export const selectJoinUs = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.careerPage.joinUs[lang];
};
export const selectJoinUsLoading = (state) => state.content.careerPage.joinUs.loading;
export const selectJoinUsError = (state) => state.content.careerPage.joinUs.error;
