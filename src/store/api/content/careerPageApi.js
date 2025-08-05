import { createAsyncThunk } from "@reduxjs/toolkit";
import { careerPageApi } from "../../../services/api/content/careerPageApi";


export const fetchCareerPageTopBlok = createAsyncThunk(
  'careerPage/fetchCareerPageTopBlok',
  async (language, { rejectWithValue }) => {
    try {
      const response = await careerPageApi.fetchCareerPageTopBlok(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCareerPageTopMedia = createAsyncThunk(
  'careerPage/fetchCareerPageTopMedia',
  async (_, { rejectWithValue }) => {
    try {
      const response = await careerPageApi.fetchCareerPageMedia();
      return { data: response };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCareerPageOurMission = createAsyncThunk(
  'careerPage/fetchCareerPageOurMission',
  async (language, { rejectWithValue }) => {
    try {
      const response = await careerPageApi.fetchCareerPageOurMission(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchWhyUs = createAsyncThunk(
  'careerPage/fetchWhyUs',
  async (language, { rejectWithValue }) => {
    try {
      const response = await careerPageApi.fetchWhyUs(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchEmployeeBenefits = createAsyncThunk(
  'careerPage/fetchEmployeeBenefits',
  async (language, { rejectWithValue }) => {
    try {
      const response = await careerPageApi.fetchEmployeeBenefits(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchJoinUs = createAsyncThunk(
  'careerPage/joinUs',
  async (language, { rejectWithValue }) => {
    try {
      const response = await careerPageApi.fetchJoinUs(language);
      return { data: response, language };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
