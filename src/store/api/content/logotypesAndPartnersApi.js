import { createAsyncThunk } from '@reduxjs/toolkit';
import { logotypesAndPartnersApi } from '../../../services/api/content/logotypesAndPartnersApi';

export const fetchLogotypes = createAsyncThunk(
  'logotypesAndPartners/fetchLogotypes',
  async (language) => {
    const response = await logotypesAndPartnersApi.fetchLogotypes(language);
    return response;
  }
);

export const fetchLogotypesMedia = createAsyncThunk(
  'logotypesAndPartners/fetchLogotypesMedia',
  async () => {
    const response = await logotypesAndPartnersApi.fetchLogotypesMedia();
    return response;
  }
);

export const fetchPartners = createAsyncThunk(
  'logotypesAndPartners/fetchPartners',
  async (language) => {
    const response = await logotypesAndPartnersApi.fetchPartners(language);
    return response;
  }
);

export const fetchPartnersMedia = createAsyncThunk(
  'logotypesAndPartners/fetchPartnersMedia',
  async () => {
    const response = await logotypesAndPartnersApi.fetchPartnersMedia();
    return response;
  }
);