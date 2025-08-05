import { createSlice } from '@reduxjs/toolkit';
import { fetchFooterThunk } from '../../api/content/footerApi';

const initialState = {
  data: {
    en: null,
    he: null,
    loading: false,
    error: null
  }
};

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooterThunk.pending, (state) => {
        state.data.loading = true;
        state.data.error = null;
      })
      .addCase(fetchFooterThunk.fulfilled, (state, action) => {
        state.data.loading = false;
        const lang = action.payload.language === 'heb' ? 'he' : 'en';
        state.data[lang] = action.payload.data;
      })
      .addCase(fetchFooterThunk.rejected, (state, action) => {
        state.data.loading = false;
        state.data.error = action.payload;
      });
  },
});

export default footerSlice.reducer;
