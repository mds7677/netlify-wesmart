import { createAsyncThunk } from '@reduxjs/toolkit';
import { productsApi } from '../../../services/api/content/productsApi';

export const fetchProductsDescription = createAsyncThunk(
  'products/fetchProductsDescription',
  async (language, { rejectWithValue }) => {
    try {
      const response = await productsApi.fetchProductsDescription(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsSlider = createAsyncThunk(
  'products/fetchProductsSlider',
  async (language, { rejectWithValue }) => {
    try {
      const response = await productsApi.fetchProductsSlider(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductDetailsGeneral = createAsyncThunk(
  'products/fetchProductDetailsGeneral',
  async ({ slug, language }, { rejectWithValue }) => {
    try {
      const response = await productsApi.fetchProductDetailsGeneral(slug, language);
      return { data: response, language, slug };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductDetailsGeneralMedia = createAsyncThunk(
  'products/fetchProductDetailsGeneralMedia',
  async ({ slug }, { rejectWithValue }) => {
    try {
      const response = await productsApi.fetchProductDetailsGeneralMedia(slug);
      return { data: response, slug };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductDetailsCards = createAsyncThunk(
  'products/fetchProductDetailsCards',
  async ({ slug, language }, { rejectWithValue }) => {
    try {
      const response = await productsApi.fetchProductDetailsCards(slug, language);
      return { data: response, language, slug };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
