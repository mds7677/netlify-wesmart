import { createSlice } from '@reduxjs/toolkit';
import { fetchHome, fetchWrittenAboutSlider, fetchWrittenAboutSliderMedia } from '../../api/content/homeApi';

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
  },
  writtenAboutSlider: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  writtenAboutSliderMedia: {
    content: null,
    loading: false,
    error: null
  },
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.pending, (state) => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.data.loading = false;
        const lang = action.payload.language === 'heb' ? 'he' : 'en';
        state.data[lang] = action.payload.data;
      })
      .addCase(fetchHome.rejected, (state, action) => {
        state.data.loading = false;
        state.data.error = action.payload;
      })

      // Written About Slider reducers
      .addCase(fetchWrittenAboutSlider.pending, (state) => {
        state.writtenAboutSlider.loading = true;
        state.writtenAboutSlider.error = null;
      })
      .addCase(fetchWrittenAboutSlider.fulfilled, (state, action) => {
        const lang = action.payload.language || "en";
        state.writtenAboutSlider[lang] = action.payload.data;
        state.writtenAboutSlider.loading = false;
      })
      .addCase(fetchWrittenAboutSlider.rejected, (state, action) => {
        state.writtenAboutSlider.loading = false;
        state.writtenAboutSlider.error = action.payload;
      })

      // Written About Slider Media reducers
      .addCase(fetchWrittenAboutSliderMedia.pending, (state) => {
        state.writtenAboutSliderMedia.loading = true;
        state.writtenAboutSliderMedia.error = null;
      })
      .addCase(fetchWrittenAboutSliderMedia.fulfilled, (state, action) => {
        state.writtenAboutSliderMedia.content = action.payload.data;
        state.writtenAboutSliderMedia.loading = false;
      })
      .addCase(fetchWrittenAboutSliderMedia.rejected, (state, action) => {
        state.writtenAboutSliderMedia.loading = false;
        state.writtenAboutSliderMedia.error = action.payload;
      });
  }
});

export default homeSlice.reducer;
