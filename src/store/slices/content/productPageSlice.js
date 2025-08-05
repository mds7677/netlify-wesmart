import { createSlice } from '@reduxjs/toolkit';
import { fetchFullSlides, fetchGeneralInfo, fetchGeneralMedia } from '../../api/content/productPaggeApi';

const initialState = {
  productGeneral: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  productGeneralMedia: {
    content: null,
    loading: false,
    error: null
  },
  productSlides: {
    en: null,
    he: null,
    loading: false,
    error: null
  }
};

export const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // General Info Reducers
      .addCase(fetchGeneralInfo.pending, (state) => {
        state.productGeneral.loading = true;
        state.productGeneral.error = null;
      })
      .addCase(fetchGeneralInfo.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.productGeneral[lang] = action.payload.data;
        state.productGeneral.loading = false;
      })
      .addCase(fetchGeneralInfo.rejected, (state, action) => {
        state.productGeneral.loading = false;
        state.productGeneral.error = action.error?.message || 'Unknown error';
      })
      
      // General Media Reducers
      .addCase(fetchGeneralMedia.pending, (state) => {
        state.productGeneralMedia.loading = true;
        state.productGeneralMedia.error = null;
      })
      .addCase(fetchGeneralMedia.fulfilled, (state, action) => {
        state.productGeneralMedia.content = action.payload.data;
        state.productGeneralMedia.loading = false;
      })
      .addCase(fetchGeneralMedia.rejected, (state, action) => {
        state.productGeneralMedia.loading = false;
        state.productGeneralMedia.error = action.error?.message || 'Unknown error';
      })
      
      // Full Slides Reducers
      .addCase(fetchFullSlides.pending, (state) => {
        state.productSlides.loading = true;
        state.productSlides.error = null;
      })
      .addCase(fetchFullSlides.fulfilled, (state, action) => {
        const lang = action.payload.language === 'he' ? 'he' : 'en';
        state.productSlides[lang] = action.payload.data;
        state.productSlides.loading = false;
      })
      .addCase(fetchFullSlides.rejected, (state, action) => {
        state.productSlides.loading = false;
        state.productSlides.error = action.error?.message || 'Unknown error';
      });
  },
});

export default productPageSlice.reducer;
