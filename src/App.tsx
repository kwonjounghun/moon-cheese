import { RouterProvider } from "react-router";
import router from "./router";
import { QueryClient, QueryClientProvider, useQueryErrorResetBoundary } from "@tanstack/react-query";
import { AsyncBoundary } from "@toss/async-boundary";
import ErrorSection from "./components/ErrorSection";
const queryClient = new QueryClient();

function App() {
  const { reset: resetQuery } = useQueryErrorResetBoundary();
  const handleRetry = (reset: () => void) => {
    resetQuery();
    reset();
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AsyncBoundary pendingFallback={<div>Loading...</div>} rejectedFallback={({ reset }) => <ErrorSection onRetry={() => { handleRetry(reset) }} />}>
        <RouterProvider router={router} />
      </AsyncBoundary>
    </QueryClientProvider>
  );
}

export default App;
