import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import theme from "./utils/chakra";
import { MoviesProvider } from "./contexts/useMovies";
import { Provider } from "react-redux";
import { store } from "./utils/redux/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true} theme={theme}>
      <BrowserRouter>
        <ColorModeScript initialColorMode="dark" />
        <Provider store={store}>
          <MoviesProvider>
            <App />
          </MoviesProvider>
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
