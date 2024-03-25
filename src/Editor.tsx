import { default as MonacoEditor } from "@monaco-editor/react";

import { usePyodide } from "./queries";
import { DEFAULT_CODE } from "./constants";

export default function Editor() {
  const { data: pyodide, isLoading } = usePyodide();

  if (isLoading) {
    console.log("Loading...")
  }

  return (
    <div>
      <div className="flex justify-end mb-3">
        <div className="flex gap-4">
          <button className="bg-zinc-900 py-1 px-4 text-white rounded-lg">Run</button>
          <button className="py-1 px-4 rounded-lg border-zinc-900 border-2">Copy</button>
        </div>
      </div>
      <MonacoEditor height="50vh" defaultLanguage="python" defaultValue={DEFAULT_CODE} theme="vs-dark" />
    </div>
  )
}