import { createAsyncThunk } from '@reduxjs/toolkit';
import { contactsApi } from '../../../services/api/content/contactsApi';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (language, { rejectWithValue }) => {
    try {
      const response = await contactsApi.fetchContacts(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCommonContacts = createAsyncThunk(
  'contacts/fetchCommonContacts',
  async (_, { rejectWithValue }) => {
    try {
      const language = localStorage.getItem('language') === 'heb' ? 'he' : 'en';
      const response = await contactsApi.fetchCommonContacts(language);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
