import { createSlice } from '@reduxjs/toolkit';
import { fetchHeader, fetchHeaderMedia } from '../../api/content/headerApi';

const initialState = {
  data: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  media: {
    content: null,
    loading: false,
    error: null
  }
};

export const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Text content reducers
      .addCase(fetchHeader.pending, (state) => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(fetchHeader.fulfilled, (state, action) => {
        state.data.loading = false;
        const lang = action.payload.language === 'heb' ? 'he' : 'en';
        state.data[lang] = action.payload.data;
      })
      .addCase(fetchHeader.rejected, (state, action) => {
        state.data.loading = false;
        state.data.error = action.payload;
      })
      // Media reducers
      .addCase(fetchHeaderMedia.pending, (state) => {
        state.media.loading = true;
        state.media.error = null;
      })
      .addCase(fetchHeaderMedia.fulfilled, (state, action) => {
        state.media.loading = false;
        state.media.content = action.payload.data;
      })
      .addCase(fetchHeaderMedia.rejected, (state, action) => {
        state.media.loading = false;
        state.media.error = action.payload;
      });
  }
});

export default headerSlice.reducer;
