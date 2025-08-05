import { createSlice } from '@reduxjs/toolkit';
import { fetchPrevClients } from '../../api/content/prevClientsApi';

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
  }
};

export const prevClientsSlice = createSlice({
  name: 'prevClients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrevClients.pending, (state) => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(fetchPrevClients.fulfilled, (state, action) => {
        state.data.loading = false;
        const lang = action.payload.language === 'heb' ? 'he' : 'en';
        state.data[lang] = action.payload.data;
      })
      .addCase(fetchPrevClients.rejected, (state, action) => {
        state.data.loading = false;
        state.data.error = action.payload;
      });
  }
});

export default prevClientsSlice.reducer;
