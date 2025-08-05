import { createAsyncThunk } from '@reduxjs/toolkit';
import { homeApi } from '../../../services/api/content/homeApi';

export const fetchHome = createAsyncThunk(
  'home/fetchHome',
  async (language, { rejectWithValue }) => {
    try {
      const response = await homeApi.fetchHome(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWrittenAboutSlider = createAsyncThunk(
  'home/fetchWrittenAboutSlider',
  async (language, { rejectWithValue }) => {
    try {
      const response = await homeApi.fetchWrittenAboutSlider(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWrittenAboutSliderMedia = createAsyncThunk(
  'home/fetchWrittenAboutSliderMedia',
  async (_, { rejectWithValue }) => {
    try {
      const response = await homeApi.fetchWrittenAboutSliderMedia();
      return { data: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
