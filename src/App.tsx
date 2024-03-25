import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Editor from './Editor'
import './index.css'

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>Local Python</h1>
      <Editor />
    </QueryClientProvider>
  )
}
