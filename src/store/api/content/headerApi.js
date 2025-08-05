import { createAsyncThunk } from '@reduxjs/toolkit';
import { headerApi } from '../../../services/api/content/headerApi';

export const fetchHeader = createAsyncThunk(
  'header/fetchHeader',
  async (language, { rejectWithValue }) => {
    try {
      const response = await headerApi.fetchHeader(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHeaderMedia = createAsyncThunk(
  'header/fetchHeaderMedia',
  async (_, { rejectWithValue }) => {
    try {
      const response = await headerApi.fetchHeaderMedia();
      return { data: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
