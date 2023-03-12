import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Routes } from "./routes";
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
      <div className="App">
        <Routes />
      </div>
    </QueryClientProvider>
  );
}

export default App;
