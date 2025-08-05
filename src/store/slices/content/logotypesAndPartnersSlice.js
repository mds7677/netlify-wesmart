import { createSlice } from '@reduxjs/toolkit';
import { fetchLogotypes, fetchLogotypesMedia, fetchPartners, fetchPartnersMedia } from '../../api/content/logotypesAndPartnersApi';

const initialState = {
  logotypes: {
    en: null,
    he: null,
    loading: false,
    error: null,
  },
  logotypesMedia: {
    content: null,
    loading: false,
    error: null,
  },
  partners: {
    en: null,
    he: null,
    loading: false,
    error: null,
  },
  partnersMedia: {
    content: null,
    loading: false,
    error: null,
  },
};

const logotypesAndPartnersSlice = createSlice({
  name: 'logotypesAndPartners',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Logotypes reducers
      .addCase(fetchLogotypes.pending, (state) => {
        state.logotypes.loading = true;
        state.logotypes.error = null;
      })
      .addCase(fetchLogotypes.fulfilled, (state, action) => {
        state.logotypes.loading = false;
        const lang = localStorage.getItem("language") === "heb" ? "he" : "en";
        state.logotypes[lang] = action.payload;
      })
      .addCase(fetchLogotypes.rejected, (state, action) => {
        state.logotypes.loading = false;
        state.logotypes.error = action.error.message;
      })

      // Logotypes media reducers
      .addCase(fetchLogotypesMedia.pending, (state) => {
        state.logotypesMedia.loading = true;
        state.logotypesMedia.error = null;
      })
      .addCase(fetchLogotypesMedia.fulfilled, (state, action) => {
        state.logotypesMedia.loading = false;
        state.logotypesMedia.content = action.payload;
      })
      .addCase(fetchLogotypesMedia.rejected, (state, action) => {
        state.logotypesMedia.loading = false;
        state.logotypesMedia.error = action.error.message;
      })

      // Partners reducers
      .addCase(fetchPartners.pending, (state) => {
        state.partners.loading = true;
        state.partners.error = null;
      })
      .addCase(fetchPartners.fulfilled, (state, action) => {
        state.partners.loading = false;
        const lang = localStorage.getItem("language") === "heb" ? "he" : "en";
        state.partners[lang] = action.payload;
      })
      .addCase(fetchPartners.rejected, (state, action) => {
        state.partners.loading = false;
        state.partners.error = action.error.message;
      })

      // Partners media reducers
      .addCase(fetchPartnersMedia.pending, (state) => {
        state.partnersMedia.loading = true;
        state.partnersMedia.error = null;
      })
      .addCase(fetchPartnersMedia.fulfilled, (state, action) => {
        state.partnersMedia.loading = false;
        state.partnersMedia.content = action.payload;
      })
      .addCase(fetchPartnersMedia.rejected, (state, action) => {
        state.partnersMedia.loading = false;
        state.partnersMedia.error = action.error.message;
      });
  },
});

export default logotypesAndPartnersSlice.reducer;
