import headerReducer from './headerSlice';
import footerReducer from './footerSlice';
import homeReducer from './homeSlice';
import contactsReducer from './contactsSlice';
import prevClientsReducer from './prevClientsSlice';
import productsReducer from './productsSlice';
import mapPointsReducer from './mapPointsSlice';
import productPageReducer from './productPageSlice';
import aboutPageReducer from './aboutPageSlice';
import logotypesAndPartnersReducer from './logotypesAndPartnersSlice';
import careerPageReducer from './careerPageSilce';

export const contentReducers = {
  header: headerReducer,
  footer: footerReducer,
  home: homeReducer,
  contacts: contactsReducer,
  prevClients: prevClientsReducer,
  products: productsReducer,
  mapPoints: mapPointsReducer,
  productPage: productPageReducer,
  aboutPage: aboutPageReducer,
  logotypesAndPartners: logotypesAndPartnersReducer,
  careerPage: careerPageReducer,
};
