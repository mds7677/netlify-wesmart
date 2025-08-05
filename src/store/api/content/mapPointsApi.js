import { createAsyncThunk } from '@reduxjs/toolkit';
import { mapPointsApi } from '../../../services/api/content';

export const fetchMapPoints = createAsyncThunk(
  'mapPoints/fetchMapPoints',
  async ({ language }) => {
    const points = await mapPointsApi.getMapPoints(language);
    return {
      points,
      language,
    };
  }
);
