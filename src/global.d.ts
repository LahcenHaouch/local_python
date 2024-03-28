type StdoutValue = {
    batched: (msg: string) => void;
}

interface Pyodide {
    setStdout: (value: StdoutValue) => void;
    setStderr: (value: StdoutValue) => void;
    runPython: (code: string) => void;
}

declare function loadPyodide(): Promise<Pyodide>;