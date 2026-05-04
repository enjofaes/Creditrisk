"use client";
import { QuizQuestion as QuizQuestionType } from "@/types/quiz";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  question: QuizQuestionType;
  selectedAnswer: number | boolean | undefined;
  revealed: boolean;
  onAnswer: (value: number | boolean) => void;
}

export function QuizQuestion({ question, selectedAnswer, revealed, onAnswer }: Props) {
  function isCorrect(idx: number | boolean): boolean {
    if (question.type === "mcq") return idx === question.correctIndex;
    return idx === question.correctAnswer;
  }

  const options =
    question.type === "true_false"
      ? [
          { label: "True", value: true as boolean },
          { label: "False", value: false as boolean },
        ]
      : (question.options ?? []).map((label, i) => ({ label, value: i }));

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
        {question.prompt}
      </p>
      <div className="space-y-2">
        {options.map(({ label, value }) => {
          const selected = selectedAnswer === value;
          const correct = isCorrect(value);
          return (
            <button
              key={String(value)}
              disabled={revealed}
              onClick={() => !revealed && onAnswer(value)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors",
                !revealed && "hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer",
                !revealed && !selected && "border-slate-200 dark:border-slate-700",
                !revealed && selected && "border-blue-500 bg-blue-50 dark:bg-blue-950/30",
                revealed && correct && "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-200",
                revealed && selected && !correct && "border-red-400 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200",
                revealed && !selected && !correct && "border-slate-200 dark:border-slate-700 opacity-50"
              )}
            >
              <div className="flex items-center gap-3">
                {revealed && correct && <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />}
                {revealed && selected && !correct && <XCircle className="h-4 w-4 text-red-500 shrink-0" />}
                <span>{label}</span>
              </div>
            </button>
          );
        })}
      </div>
      {revealed && (
        <div className="rounded-lg bg-slate-50 dark:bg-slate-800 p-4 text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          <span className="font-semibold">Explanation: </span>
          {question.explanation}
        </div>
      )}
    </div>
  );
}
