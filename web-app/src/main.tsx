import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Spinner from "./components/common/spinner/spinner.component.tsx";
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5,
    },
  },
});

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={<Spinner />} persistor={persistor}> */}
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
