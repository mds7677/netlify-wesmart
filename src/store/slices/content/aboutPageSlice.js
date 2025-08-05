import { createSlice } from '@reduxjs/toolkit';
import { 
  fetchAboutPageMainBlock, 
  fetchAboutThesesBlocks, 
  fetchAboutThesesBlocksMedia,
  fetchCustomizedSolutionsBlocks,
  fetchInviteBlocks,
  fetchLearnMoreBlocks,
  fetchLearnMoreBlocksMedia,
  fetchOurTeamBlocks,
  fetchOurTeamBlocksMedia
} from '../../api/content/aboutPageApi';

const initialState = {
  aboutMainBlock: {
    he: null,
    en: null,
    error: null,
    loading: false,
  },
  aboutThesesBlocks: {
    he: null,
    en: null,
    error: null,
    loading: false,
  },
  aboutThesesBlocksMedia: {
    content: null,
    loading: false,
    error: null
  },
  customizedSolutionsBlocks: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  ourTeamBlocks: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  ourTeamBlocksMedia: {
    content: null,
    loading: false,
    error: null
  },
  learnMoreBlocks: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  learnMoreBlocksMedia: {
    content: null,
    loading: false,
    error: null
  },
  inviteBlocks: {
    en: null,
    he: null,
    loading: false,
    error: null
  }
};

export const aboutPageSlice = createSlice({
  name: 'aboutPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // About Main Block Reducers
      .addCase(fetchAboutPageMainBlock.pending, (state) => {
        state.aboutMainBlock.loading = true;
        state.aboutMainBlock.error = null;
      })
      .addCase(fetchAboutPageMainBlock.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.aboutMainBlock[lang] = action.payload.data;
        state.aboutMainBlock.loading = false;
      })
      .addCase(fetchAboutPageMainBlock.rejected, (state, action) => {
        state.aboutMainBlock.loading = false;
        state.aboutMainBlock.error = action.error?.message || 'Unknown error';
      })

      // About Theses Blocks Reducers
      .addCase(fetchAboutThesesBlocks.pending, (state) => {
        state.aboutThesesBlocks.loading = true;
        state.aboutThesesBlocks.error = null;
      })
      .addCase(fetchAboutThesesBlocks.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.aboutThesesBlocks[lang] = action.payload.data;
        state.aboutThesesBlocks.loading = false;
      })
      .addCase(fetchAboutThesesBlocks.rejected, (state, action) => {
        state.aboutThesesBlocks.loading = false;
        state.aboutThesesBlocks.error = action.error?.message || 'Unknown error';
      })

      // About Theses Blocks Media Reducers
      .addCase(fetchAboutThesesBlocksMedia.pending, (state) => {
        state.aboutThesesBlocksMedia.loading = true;
        state.aboutThesesBlocksMedia.error = null;
      })
      .addCase(fetchAboutThesesBlocksMedia.fulfilled, (state, action) => {
        state.aboutThesesBlocksMedia.content = action.payload.data;
        state.aboutThesesBlocksMedia.loading = false;
      })
      .addCase(fetchAboutThesesBlocksMedia.rejected, (state, action) => {
        state.aboutThesesBlocksMedia.loading = false;
        state.aboutThesesBlocksMedia.error = action.error?.message || 'Unknown error';
      })

      // Customized Solutions Reducers
      .addCase(fetchCustomizedSolutionsBlocks.pending, (state) => {
        state.customizedSolutionsBlocks.loading = true;
        state.customizedSolutionsBlocks.error = null;
      })
      .addCase(fetchCustomizedSolutionsBlocks.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.customizedSolutionsBlocks[lang] = action.payload.data;
        state.customizedSolutionsBlocks.loading = false;
      })
      .addCase(fetchCustomizedSolutionsBlocks.rejected, (state, action) => {
        state.customizedSolutionsBlocks.loading = false;
        state.customizedSolutionsBlocks.error = action.error?.message || 'Unknown error';
      })

      // Our Team Reducers
      .addCase(fetchOurTeamBlocks.pending, (state) => {
        state.ourTeamBlocks.loading = true;
        state.ourTeamBlocks.error = null;
      })
      .addCase(fetchOurTeamBlocks.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.ourTeamBlocks[lang] = action.payload.data;
        state.ourTeamBlocks.loading = false;
      })
      .addCase(fetchOurTeamBlocks.rejected, (state, action) => {
        state.ourTeamBlocks.loading = false;
        state.ourTeamBlocks.error = action.error?.message || 'Unknown error';
      })

      // Our Team Blocks Media Reducers
      .addCase(fetchOurTeamBlocksMedia.pending, (state) => {
        state.ourTeamBlocksMedia.loading = true;
        state.ourTeamBlocksMedia.error = null;
      })
      .addCase(fetchOurTeamBlocksMedia.fulfilled, (state, action) => {
        state.ourTeamBlocksMedia.content = action.payload.data;
        state.ourTeamBlocksMedia.loading = false;
      })
      .addCase(fetchOurTeamBlocksMedia.rejected, (state, action) => {
        state.ourTeamBlocksMedia.loading = false;
        state.ourTeamBlocksMedia.error = action.error?.message || 'Unknown error';
      })

      // Learn More Blocks Reducers
      .addCase(fetchLearnMoreBlocks.pending, (state) => {
        state.learnMoreBlocks.loading = true;
        state.learnMoreBlocks.error = null;
      })
      .addCase(fetchLearnMoreBlocks.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.learnMoreBlocks[lang] = action.payload.data;
        state.learnMoreBlocks.loading = false;
      })
      .addCase(fetchLearnMoreBlocks.rejected, (state, action) => {
        state.learnMoreBlocks.loading = false;
        state.learnMoreBlocks.error = action.error?.message || 'Unknown error';
      })

      // Learn More Blocks Media Reducers
      .addCase(fetchLearnMoreBlocksMedia.pending, (state) => {
        state.learnMoreBlocksMedia.loading = true;
        state.learnMoreBlocksMedia.error = null;
      })
      .addCase(fetchLearnMoreBlocksMedia.fulfilled, (state, action) => {
        state.learnMoreBlocksMedia.content = action.payload.data;
        state.learnMoreBlocksMedia.loading = false;
      })
      .addCase(fetchLearnMoreBlocksMedia.rejected, (state, action) => {
        state.learnMoreBlocksMedia.loading = false;
        state.learnMoreBlocksMedia.error = action.error?.message || 'Unknown error';
      })

      // Invite Blocks Reducers
      .addCase(fetchInviteBlocks.pending, (state) => {
        state.inviteBlocks.loading = true;
        state.inviteBlocks.error = null;
      })
      .addCase(fetchInviteBlocks.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.inviteBlocks[lang] = action.payload.data;
        state.inviteBlocks.loading = false;
      })
      .addCase(fetchInviteBlocks.rejected, (state, action) => {
        state.inviteBlocks.loading = false;
        state.inviteBlocks.error = action.error?.message || 'Unknown error';
      });
  },
});

export default aboutPageSlice.reducer;
