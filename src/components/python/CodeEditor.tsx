"use client";
import dynamic from "next/dynamic";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { useTheme } from "next-themes";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), { ssr: false });

interface CodeEditorProps {
  value: string;
  onChange: (v: string) => void;
  readOnly?: boolean;
  height?: number;
}

export function CodeEditor({ value, onChange, readOnly = false, height = 220 }: CodeEditorProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <CodeMirror
      value={value}
      height={`${height}px`}
      extensions={[
        python(),
        EditorView.lineWrapping,
        EditorView.editable.of(!readOnly),
      ]}
      theme={isDark ? oneDark : "light"}
      onChange={onChange}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        dropCursor: false,
        allowMultipleSelections: false,
        indentOnInput: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        tabSize: 4,
      }}
      className="rounded-t-xl overflow-hidden text-sm"
    />
  );
}
