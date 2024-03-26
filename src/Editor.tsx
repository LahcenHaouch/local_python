import { useRef, useState, useEffect } from "react";
import { default as MonacoEditor, OnMount } from "@monaco-editor/react";

import { usePyodide } from "./queries";
import { DEFAULT_CODE } from "./constants";

type Result = {
  id: string;
  msg: string;
};

export default function Editor() {
  const editorRef = useRef<any>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [errors, setErrors] = useState<Result[]>([]);
  const { data: pyodide, isLoading } = usePyodide();

  useEffect(() => {
    if (pyodide) {
      pyodide.setStdout({
        batched: (msg: string) =>
          setResults((prevResults) => [
            ...prevResults,
            { id: crypto.randomUUID(), msg },
          ]),
      });
      pyodide.setStderr({
        batched: (msg: string) => {
          console.log("in error", msg);
          setErrors((prevErrors) => [
            ...prevErrors,
            { id: crypto.randomUUID(), msg },
          ]);
        },
      });
    }
  }, [pyodide]);

  if (isLoading) {
    console.log("Loading...");
  }

  const handleRun = () => {
    if (!editorRef.current || !pyodide) {
      return;
    }

    const value = editorRef.current.getValue();

    pyodide.runPython(value);
  };

  const handleCopy = () => {
    //
  };

  const handleClearLogs = () => setResults([]);

  const handleEditorDidMount: OnMount = (editor) =>
    (editorRef.current = editor);

  return (
    <div>
      <div className="flex justify-end mb-3">
        <div className="flex gap-4">
          <button
            className="bg-editor py-1 px-4 text-white rounded-lg"
            onClick={handleRun}
          >
            Run
          </button>
          <button
            className="py-1 px-4 rounded-lg border-editor border-2"
            onClick={handleCopy}
          >
            Copy
          </button>
        </div>
      </div>
      <MonacoEditor
        className="mb-4"
        height="50vh"
        defaultLanguage="python"
        defaultValue={DEFAULT_CODE}
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
      <div className="flex justify-end mb-3">
        <button
          className="py-1 px-4 rounded-lg border-editor border-2"
          onClick={handleClearLogs}
        >
          Clear logs
        </button>
      </div>
      <div className="bg-editor text-white h-60 p-4 overflow-y-scroll resize-y">
        <ul>
          {results.map((result) => (
            <li key={result.id}>
              <span className="text-sky-600 mr-2">$</span>
              {result.msg}
            </li>
          ))}
          {errors.map((error) => (
            <li key={error.id} className="text-red-700">
              {error.msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
