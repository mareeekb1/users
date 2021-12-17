import React from 'react';
import ReactDOM from 'react-dom';
import App, { token } from './App';
import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
import { persistor, store } from "./services/store"
import { BrowserRouter } from "react-router-dom";
import { Provider, createClient } from "urql";

const client = createClient({
  url: "https://industry.hasura.app/v1/graphql",
  fetchOptions: () => {
    return {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": token
      },
    };
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Provider value={client}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      </PersistGate>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
