import { createAsyncThunk } from '@reduxjs/toolkit';
import { prevClientsApi } from '../../../services/api/content/prevClientsApi';

export const fetchPrevClients = createAsyncThunk(
  'prevClients/fetchPrevClients',
  async (language, { rejectWithValue }) => {
    try {
      const response = await prevClientsApi.fetchPrevClients(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
