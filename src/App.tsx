import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { useRoutes } from "react-router-dom";
import { routes, Routes } from "./routes";
import GlobalRouter from "./routes/router";
import { initTheme } from "./utils";

function App() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 10 * 1000,
        cacheTime: 10 * 1000,
        retry: 1,
      },
    },
  });

  useEffect(() => {
    initTheme();
  }, []);
  return (
    <QueryClientProvider client={client}>
      <GlobalRouter>{useRoutes(routes)}</GlobalRouter>
    </QueryClientProvider>
  );
}

export default App;
