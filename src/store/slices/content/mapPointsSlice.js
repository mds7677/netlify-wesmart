import { createSlice } from '@reduxjs/toolkit';
import { fetchMapPoints } from '../../api/content';

const initialState = {
  data: {
    heb: {
      points: {},
      loading: false,
      error: null,
    },
    en: {
      points: {},
      loading: false,
      error: null,
    }
  },
};

const mapPointsSlice = createSlice({
  name: 'mapPoints',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMapPoints.pending, (state, action) => {
        const lang = action.meta.arg.language;
        if (!state.data[lang]) {
          state.data[lang] = {
            points: {},
            loading: false,
            error: null
          };
        }
        state.data[lang].loading = true;
        state.data[lang].error = null;
      })
      .addCase(fetchMapPoints.fulfilled, (state, action) => {
        const lang = action.meta.arg.language;
        if (!state.data[lang]) {
          state.data[lang] = {
            points: {},
            loading: false,
            error: null
          };
        }
        state.data[lang].loading = false;
        state.data[lang].points = action.payload;
      })
      .addCase(fetchMapPoints.rejected, (state, action) => {
        const lang = action.meta.arg.language;
        if (!state.data[lang]) {
          state.data[lang] = {
            points: {},
            loading: false,
            error: null
          };
        }
        state.data[lang].loading = false;
        state.data[lang].error = action.error.message;
      });
  },
});

export default mapPointsSlice.reducer;
