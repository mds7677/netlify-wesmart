import { createAsyncThunk } from '@reduxjs/toolkit';
import { productPageApi } from '../../../services/api/content/productPageApi';


export const fetchFullSlides = createAsyncThunk(
  'productPage/fetchFullSlides',
  async (language, { rejectWithValue }) => {
    try {
      const response = await productPageApi.fetchFullSlides(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGeneralInfo = createAsyncThunk(
  'productPage/fetchGeneralInfo',
  async (language, { rejectWithValue }) => {
    try {
      const response = await productPageApi.fetchGeneralInfo(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGeneralMedia = createAsyncThunk(
  'productPage/fetchGeneralMedia',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productPageApi.fetchGeneralMedia();
      return { data: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
