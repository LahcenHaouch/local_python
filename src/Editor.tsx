import { useRef, useState, useEffect } from "react";
import { default as MonacoEditor, OnMount } from "@monaco-editor/react";
import toast from "react-hot-toast";

import { usePyodide } from "./queries";
import { DEFAULT_CODE } from "./constants";

type Result = {
  id: string;
  msg: string;
  isStderr: boolean;
  isError: boolean;
};

export default function Editor() {
  const editorRef = useRef<any>(null);
  const [results, setResults] = useState<Result[]>([]);
  const { data: pyodide, isLoading } = usePyodide();

  useEffect(() => {
    if (pyodide) {
      pyodide.setStdout({
        batched: (msg: string) =>
          setResults((prevResults) => [
            ...prevResults,
            { id: crypto.randomUUID(), msg, isStderr: false, isError: false },
          ]),
      });
      pyodide.setStderr({
        batched: (msg: string) => {
          console.log("in error", msg);
          setResults((prevResults) => [
            ...prevResults,
            { id: crypto.randomUUID(), msg, isStderr: true, isError: false },
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

    const code = editorRef.current.getValue();
    try {
      pyodide.runPython(code);
    } catch (error: unknown) {
      setResults((prevResults) => [
        ...prevResults,
        {
          id: crypto.randomUUID(),
          msg: (error as Error).message,
          isError: true,
          isStderr: false,
        },
      ]);
    }
  };

  const handleCopy = () => {
    if (!editorRef.current) {
      return;
    }

    const code = editorRef.current.getValue();

    toast.promise(
      navigator.clipboard.writeText(code),
      {
        loading: "Copying...",
        success: <b>Code copied to clipboard!</b>,
        error: <b>Could not copy code.</b>,
      },
      {
        icon: "🐍",
        style: {
          backgroundColor: "#1E1E1E",
          color: "white",
        },
      }
    );
  };

  const handleClearLogs = () => {
    if (results.length === 0) {
      return;
    }
    setResults([]);
  };

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
              <span className="text-sky-600 mr-2">
                {result.isStderr
                  ? "[stderr]:"
                  : result.isError
                  ? "[error]"
                  : ""}
                $
              </span>
              {result.msg}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
