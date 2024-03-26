import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Editor from './Editor'
import './index.css'

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="px-10">
        <h1 className="mt-10 mb-10 text-4xl text-editor">Local Python</h1>
        <Editor />
      </div>
    </QueryClientProvider>
  )
}
