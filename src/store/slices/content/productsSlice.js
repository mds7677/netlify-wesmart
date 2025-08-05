import { createSlice } from '@reduxjs/toolkit';
import {
  fetchProductsDescription,
  fetchProductsSlider,
  fetchProductDetailsGeneral,
  fetchProductDetailsGeneralMedia,
  fetchProductDetailsCards
} from '../../api/content/productsApi';

const initialState = {
  productsDescription: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  productsSlider: {
    en: null,
    he: null,
    loading: false,
    error: null
  },
  productsDetails: {
    general: {
      data: {
        bySlug: {},
        loading: false,
        error: null
      },
      media: {
        bySlug: {},
        loading: false,
        error: null
      }
    },
    cards: {
      data: {
        bySlug: {},
        loading: false,
        error: null
      },
    }
  }
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Products Description reducers
      .addCase(fetchProductsDescription.pending, (state) => {
        state.productsDescription.loading = true;
        state.productsDescription.error = null;
      })
      .addCase(fetchProductsDescription.fulfilled, (state, action) => {
        state.productsDescription.loading = false;
        const lang = action.payload.language === 'heb' ? 'he' : 'en';
        state.productsDescription[lang] = action.payload.data;
      })
      .addCase(fetchProductsDescription.rejected, (state, action) => {
        state.productsDescription.loading = false;
        state.productsDescription.error = action.payload;
      })
      // Products Slider reducers
      .addCase(fetchProductsSlider.pending, (state) => {
        state.productsSlider.loading = true;
        state.productsSlider.error = null;
      })
      .addCase(fetchProductsSlider.fulfilled, (state, action) => {
        state.productsSlider.loading = false;
        const lang = action.payload.language === 'heb' ? 'he' : 'en';
        state.productsSlider[lang] = action.payload.data;
      })
      .addCase(fetchProductsSlider.rejected, (state, action) => {
        state.productsSlider.loading = false;
        state.productsSlider.error = action.payload;
      })
      // Product Details General
      .addCase(fetchProductDetailsGeneral.pending, (state) => {
        state.productsDetails.general.data.loading = true;
        state.productsDetails.general.data.error = null;
      })
      .addCase(fetchProductDetailsGeneral.fulfilled, (state, action) => {
        console.log('General Payload:', action.payload);
        state.productsDetails.general.data.loading = false;
        const lang = action.payload.language === 'heb' ? 'he' : 'en';
        if (!state.productsDetails.general.data.bySlug[action.payload.slug]) {
          state.productsDetails.general.data.bySlug[action.payload.slug] = {
            en: null,
            he: null
          };
        }
        state.productsDetails.general.data.bySlug[action.payload.slug][lang] = action.payload.data;
      })
      .addCase(fetchProductDetailsGeneral.rejected, (state, action) => {
        state.productsDetails.general.data.loading = false;
        state.productsDetails.general.data.error = action.payload;
      })

      // Product Details General Media
      .addCase(fetchProductDetailsGeneralMedia.pending, (state) => {
        state.productsDetails.general.media.loading = true;
        state.productsDetails.general.media.error = null;
      })
      .addCase(fetchProductDetailsGeneralMedia.fulfilled, (state, action) => {
        console.log('Media Payload:', action.payload);
        state.productsDetails.general.media.loading = false;
        state.productsDetails.general.media.bySlug[action.payload.slug] = action.payload.data;
      })
      .addCase(fetchProductDetailsGeneralMedia.rejected, (state, action) => {
        state.productsDetails.general.media.loading = false;
        state.productsDetails.general.media.error = action.payload;
      })

      // Product Details Cards
      .addCase(fetchProductDetailsCards.pending, (state) => {
        state.productsDetails.cards.data.loading = true;
        state.productsDetails.cards.data.error = null;
      })
      .addCase(fetchProductDetailsCards.fulfilled, (state, action) => {
        console.log('Cards Payload:', action.payload);
        state.productsDetails.cards.data.loading = false;
        const lang = action.payload.language === 'heb' ? 'he' : 'en';
        if (!state.productsDetails.cards.data.bySlug[action.payload.slug]) {
          state.productsDetails.cards.data.bySlug[action.payload.slug] = {
            en: null,
            he: null
          };
        }
        state.productsDetails.cards.data.bySlug[action.payload.slug][lang] = action.payload.data;
      })
      .addCase(fetchProductDetailsCards.rejected, (state, action) => {
        state.productsDetails.cards.data.loading = false;
        state.productsDetails.cards.data.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
