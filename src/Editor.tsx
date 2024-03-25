import { default as MonacoEditor } from "@monaco-editor/react";

import { usePyodide } from "./queries";

export default function Editor() {
  const { data: pyodide, isLoading } = usePyodide();

  if (isLoading) {
    console.log("Loading...")
  }

  console.log({ pyodide })
  return <MonacoEditor height="90vh" defaultLanguage="python" defaultValue="// some comment" theme="vs-dark" />;
}