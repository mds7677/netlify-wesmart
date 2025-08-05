// About Page Selectors
export const selectAboutMainBlock = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.aboutPage.aboutMainBlock[lang];
};
export const selectAboutMainBlockLoading = (state) => 
  state.content.aboutPage.aboutMainBlock.loading;
export const selectAboutMainBlockError = (state) => 
  state.content.aboutPage.aboutMainBlock.error;

// About Theses Blocks Selectors
export const selectAboutThesesBlocks = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.aboutPage.aboutThesesBlocks[lang];
};
export const selectAboutThesesBlocksLoading = (state) => 
  state.content.aboutPage.aboutThesesBlocks.loading;
export const selectAboutThesesBlocksError = (state) => 
  state.content.aboutPage.aboutThesesBlocks.error;

// About Theses Blocks Media Selectors
export const selectAboutThesesBlocksMedia = (state) => 
  state.content.aboutPage.aboutThesesBlocksMedia.content;
export const selectAboutThesesBlocksMediaLoading = (state) => 
  state.content.aboutPage.aboutThesesBlocksMedia.loading;
export const selectAboutThesesBlocksMediaError = (state) => 
  state.content.aboutPage.aboutThesesBlocksMedia.error;

// Customized Solutions Blocks Selectors
export const selectCustomizedSolutionsBlocks = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.aboutPage.customizedSolutionsBlocks[lang];
};
export const selectCustomizedSolutionsBlocksLoading = (state) => 
  state.content.aboutPage.customizedSolutionsBlocks.loading;
export const selectCustomizedSolutionsBlocksError = (state) => 
  state.content.aboutPage.customizedSolutionsBlocks.error;

// Our Team Blocks Selectors
export const selectOurTeamBlocks = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.aboutPage.ourTeamBlocks[lang];
};
export const selectOurTeamBlocksLoading = (state) => 
  state.content.aboutPage.ourTeamBlocks.loading;
export const selectOurTeamBlocksError = (state) => 
  state.content.aboutPage.ourTeamBlocks.error;

// Our Team Blocks Media Selectors
export const selectOurTeamBlocksMedia = (state) => 
  state.content.aboutPage.ourTeamBlocksMedia.content;
export const selectOurTeamBlocksMediaLoading = (state) => 
  state.content.aboutPage.ourTeamBlocksMedia.loading;
export const selectOurTeamBlocksMediaError = (state) => 
  state.content.aboutPage.ourTeamBlocksMedia.error;

// Learn More Blocks Selectors
export const selectLearnMoreBlocks = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.aboutPage.learnMoreBlocks[lang];
};
export const selectLearnMoreBlocksLoading = (state) => 
  state.content.aboutPage.learnMoreBlocks.loading;
export const selectLearnMoreBlocksError = (state) => 
  state.content.aboutPage.learnMoreBlocks.error;

// Learn More Blocks Media Selectors
export const selectLearnMoreBlocksMedia = (state) => 
  state.content.aboutPage.learnMoreBlocksMedia.content;
export const selectLearnMoreBlocksMediaLoading = (state) => 
  state.content.aboutPage.learnMoreBlocksMedia.loading;
export const selectLearnMoreBlocksMediaError = (state) => 
  state.content.aboutPage.learnMoreBlocksMedia.error;

// Invite Blocks Selectors
export const selectInviteBlocks = (state, language) => {
  const lang = language === 'he' ? 'he' : 'en';
  return state.content.aboutPage.inviteBlocks[lang];
};
export const selectInviteBlocksLoading = (state) => 
  state.content.aboutPage.inviteBlocks.loading;
export const selectInviteBlocksError = (state) => 
  state.content.aboutPage.inviteBlocks.error;
