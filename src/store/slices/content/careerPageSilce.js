import { createSlice } from '@reduxjs/toolkit';
import { fetchCareerPageOurMission, fetchCareerPageTopBlok, fetchCareerPageTopMedia, fetchEmployeeBenefits, fetchJoinUs, fetchWhyUs } from '../../api/content/careerPageApi';

const initialState = {
  careerPageTopBlok: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  careerPageTopBlokMedia: {
    content: null,
    loading: false,
    error: null
  },
  careerPageOurMission: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  whyChooseWeSmart: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  EmployeeBenefits: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  joinUs: {
    en: null,
    he: null,
    loading: false,
    error: null
  }
};

export const careerPageSlice = createSlice({
  name: 'careerPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Top blok reducers
      .addCase(fetchCareerPageTopBlok.pending, (state) => {
        state.careerPageTopBlok.loading = true;
        state.careerPageTopBlok.error = null;
      })
      .addCase(fetchCareerPageTopBlok.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.careerPageTopBlok[lang] = action.payload.data;
        state.careerPageTopBlok.loading = false;
      })
      .addCase(fetchCareerPageTopBlok.rejected, (state, action) => {
        state.careerPageTopBlok.loading = false;
        state.careerPageTopBlok.error = action.payload;
      })

      // Top blok media reducers
      .addCase(fetchCareerPageTopMedia.pending, (state) => {
        state.careerPageTopBlokMedia.loading = true;
        state.careerPageTopBlokMedia.error = null;
      })
      .addCase(fetchCareerPageTopMedia.fulfilled, (state, action) => {
        state.careerPageTopBlokMedia.content = action.payload.data;
        state.careerPageTopBlokMedia.loading = false;
      })
      .addCase(fetchCareerPageTopMedia.rejected, (state, action) => {
        state.careerPageTopBlokMedia.loading = false;
        state.careerPageTopBlokMedia.error = action.payload;
      })

      // Our mission reducers
      .addCase(fetchCareerPageOurMission.pending, (state) => {
        state.careerPageOurMission.loading = true;
        state.careerPageOurMission.error = null;
      })
      .addCase(fetchCareerPageOurMission.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.careerPageOurMission[lang] = action.payload.data;
        state.careerPageOurMission.loading = false;
      })
      .addCase(fetchCareerPageOurMission.rejected, (state, action) => {
        state.careerPageOurMission.loading = false;
        state.careerPageOurMission.error = action.payload;
      })

      // Why choose WeSmart reducers
      .addCase(fetchWhyUs.pending, (state) => {
        state.whyChooseWeSmart.loading = true;
        state.whyChooseWeSmart.error = null;
      })
      .addCase(fetchWhyUs.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.whyChooseWeSmart[lang] = action.payload.data;
        state.whyChooseWeSmart.loading = false;
      })
      .addCase(fetchWhyUs.rejected, (state, action) => {
        state.whyChooseWeSmart.loading = false;
        state.whyChooseWeSmart.error = action.payload;
      })

      // Employee benefits reducers
      .addCase(fetchEmployeeBenefits.pending, (state) => {
        state.EmployeeBenefits.loading = true;
        state.EmployeeBenefits.error = null;
      })
      .addCase(fetchEmployeeBenefits.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.EmployeeBenefits[lang] = action.payload.data;
        state.EmployeeBenefits.loading = false;
      })
      .addCase(fetchEmployeeBenefits.rejected, (state, action) => {
        state.EmployeeBenefits.loading = false;
        state.EmployeeBenefits.error = action.payload;
      })
      
      // Join us reducers
      .addCase(fetchJoinUs.pending, (state) => {
        state.joinUs.loading = true;
        state.joinUs.error = null;
      })
      .addCase(fetchJoinUs.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.joinUs[lang] = action.payload.data;
        state.joinUs.loading = false;
      })
      .addCase(fetchJoinUs.rejected, (state, action) => {
        state.joinUs.loading = false;
        state.joinUs.error = action.payload;
      });
  },
});

export default careerPageSlice.reducer;
