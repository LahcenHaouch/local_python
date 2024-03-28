import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { Editor } from "./components";
import "./index.css";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="md:container md:mx-auto">
        <h1 className="mt-10 mb-10 text-4xl text-editor">🐍 Local Python</h1>
        <Editor />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
