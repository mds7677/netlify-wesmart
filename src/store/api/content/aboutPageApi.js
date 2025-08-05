import { createAsyncThunk } from '@reduxjs/toolkit';
import { aboutApi } from '../../../services/api/content/aboutApi';

export const fetchAboutPageMainBlock = createAsyncThunk(
  'aboutPage/fetchAboutPageMainBlock',
  async (language, { rejectWithValue }) => {
    try {
      const response = await aboutApi.fetchAboutPageMainBlock(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAboutThesesBlocks = createAsyncThunk(
  'aboutPage/fetchAboutThesesBlocks',
  async (language, { rejectWithValue }) => {
    try {
      const response = await aboutApi.fetchAAboutThesesBlocks(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAboutThesesBlocksMedia = createAsyncThunk(
  'aboutPage/fetchAboutThesesBlocksMedia',
  async (_, { rejectWithValue }) => {
    try {
      const response = await aboutApi.fetchAboutThesesBlocksMedia();
      return { data: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCustomizedSolutionsBlocks = createAsyncThunk(
  'aboutPage/fetchCustomizedSolutionsBlocks',
  async (language, { rejectWithValue }) => {
    try {
      const response = await aboutApi.fetchCustomizedSolutionsBlocks(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOurTeamBlocks = createAsyncThunk(
  'aboutPage/fetchOurTeamBlocks',
  async (language, { rejectWithValue }) => {
    try {
      const response = await aboutApi.fetchOurTeamBlocks(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOurTeamBlocksMedia = createAsyncThunk(
  'aboutPage/fetchOurTeamBlocksMedia',
  async (_, { rejectWithValue }) => {
    try {
      const response = await aboutApi.fetchOurTeamBlocksMedia();
      return { data: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLearnMoreBlocks = createAsyncThunk(
  'aboutPage/fetchLearnMoreBlocks',
  async (language, { rejectWithValue }) => {
    try {
      const response = await aboutApi.fetchLearnMoreBlocks(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLearnMoreBlocksMedia = createAsyncThunk(
  'aboutPage/fetchLearnMoreBlocksMedia',
  async (_, { rejectWithValue }) => {
    try {
      const response = await aboutApi.fetchLearnMoreBlocksMedia();
      return { data: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchInviteBlocks = createAsyncThunk(
  'aboutPage/fetchInviteBlocks',
  async (language, { rejectWithValue }) => {
    try {
      const response = await aboutApi.fetchInviteBlocks(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
