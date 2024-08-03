'use client';

import { ThemeProvider } from "../context/ThemeContext";
import { Provider } from "react-redux";
import { store } from "../store/store";

export default function ClientProviders({ children }) {
  
  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </Provider>
  );
}