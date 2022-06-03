import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import store from "./store/configureStore";
import ptBR from "antd/es/locale/pt_BR";
import ErrorBoundary from "./helper/ErrorBoundary";

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
