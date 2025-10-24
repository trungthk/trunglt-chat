import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import store from "./app/store";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
