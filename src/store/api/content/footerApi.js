import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFooter } from '../../../services/api/content/footerApi';

export const fetchFooterThunk = createAsyncThunk(
  'footer/fetchFooter',
  async (language, { rejectWithValue }) => {
    try {
      const response = await fetchFooter(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);