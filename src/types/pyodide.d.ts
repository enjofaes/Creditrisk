export interface PyodideInterface {
  runPython: (code: string) => unknown;
  runPythonAsync: (code: string) => Promise<unknown>;
  loadPackagesFromImports: (code: string) => Promise<void>;
  loadPackage: (names: string | string[]) => Promise<void>;
  globals: {
    get: (key: string) => unknown;
    set: (key: string, value: unknown) => void;
  };
  setStdout: (options: { batched: (text: string) => void }) => void;
  setStderr: (options: { batched: (text: string) => void }) => void;
}

export interface RunResult {
  stdout: string;
  stderr: string;
  figures: string[];
  result: unknown;
  error?: string;
}

declare global {
  interface Window {
    loadPyodide: (options: {
      indexURL: string;
      stdout?: (text: string) => void;
      stderr?: (text: string) => void;
    }) => Promise<PyodideInterface>;
    pyodideInstance?: PyodideInterface;
  }
}
