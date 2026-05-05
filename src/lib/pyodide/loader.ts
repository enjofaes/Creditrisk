import { PyodideInterface, RunResult } from "@/types/pyodide";
import { BUNDLED_PACKAGES, PYODIDE_CDN_URL } from "./preload-packages";
import { PLOT_CAPTURE_SETUP } from "./plot-capture";

let pyodideInstance: PyodideInterface | null = null;
let loadPromise: Promise<PyodideInterface> | null = null;

export async function getPyodide(): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    await injectScript(`${PYODIDE_CDN_URL}pyodide.js`);
    const instance = await window.loadPyodide({ indexURL: PYODIDE_CDN_URL });
    await instance.loadPackage(BUNDLED_PACKAGES);
    await instance.runPythonAsync(PLOT_CAPTURE_SETUP);
    pyodideInstance = instance;
    return instance;
  })();

  return loadPromise;
}

function injectScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.crossOrigin = "anonymous";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

export async function runCode(code: string): Promise<RunResult> {
  const py = await getPyodide();
  const stdoutLines: string[] = [];
  const stderrLines: string[] = [];

  py.setStdout({ batched: (t: string) => stdoutLines.push(t) });
  py.setStderr({ batched: (t: string) => stderrLines.push(t) });

  let result: unknown;
  let error: string | undefined;

  try {
    result = await py.runPythonAsync(code);
  } catch (e) {
    error = String(e);
  }

  let figures: string[] = [];
  try {
    const figuresJson = await py.runPythonAsync("_capture_figures()") as string;
    figures = JSON.parse(figuresJson);
  } catch {
    // _capture_figures may not be defined if init failed
  }

  return {
    stdout: stdoutLines.join("\n"),
    stderr: stderrLines.join("\n"),
    figures,
    result,
    error,
  };
}
