/* eslint-disable no-unused-vars */
import React from "react";
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import routes from "./routes";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import CustomToast from "./components/CustomToast";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PrimeReactProvider>
          <RouterProvider router={router} />
          <CustomToast />
        </PrimeReactProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
