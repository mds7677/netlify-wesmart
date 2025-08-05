import { configureStore } from '@reduxjs/toolkit';
import { contentReducers } from './slices/content';
import { combineReducers } from '@reduxjs/toolkit';

const contentReducer = combineReducers({
  header: contentReducers.header,
  footer: contentReducers.footer,
  home: contentReducers.home,
  contacts: contentReducers.contacts,
  prevClients: contentReducers.prevClients,
  products: contentReducers.products,
  mapPoints: contentReducers.mapPoints,
  productPage: contentReducers.productPage,
  aboutPage: contentReducers.aboutPage,
  logotypesAndPartners: contentReducers.logotypesAndPartners,
  careerPage: contentReducers.careerPage,
});

export const store = configureStore({
  reducer: {
    content: contentReducer,
  },
});
