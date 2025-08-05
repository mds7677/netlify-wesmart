import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, fetchCommonContacts } from '../../api/content/contactsApi';

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
  commonContacts: {
    data: null,
    loading: false,
    error: null
  }
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.data.loading = false;
        const lang = action.payload.language === 'heb' ? 'he' : 'en';
        state.data[lang] = action.payload.data;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.data.loading = false;
        state.data.error = action.payload;
      })
      .addCase(fetchCommonContacts.pending, (state) => {
        state.commonContacts.loading = true;
        state.commonContacts.error = null;
      })
      .addCase(fetchCommonContacts.fulfilled, (state, action) => {
        state.commonContacts.loading = false;
        state.commonContacts.data = action.payload;
      })
      .addCase(fetchCommonContacts.rejected, (state, action) => {
        state.commonContacts.loading = false;
        state.commonContacts.error = action.payload;
      });
  }
});

export default contactsSlice.reducer;
