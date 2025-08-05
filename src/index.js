import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import Products from "./pages/Products/Products";
import About from "./pages/About/About";
import HomeV2 from "./pages/HomeV2/HomeV2";
import Careers from "./pages/Careers/Careers";
import Contacts from "./pages/Contacts/Contacts";
import Product from "./pages/Product/Product";
import "./localization/i18n";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeV2 />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/careers",
    element: <Careers />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/product/:slug",
    element: <Product />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <WhatsAppButton />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
