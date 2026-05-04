import Link from "next/link";
import { MODULES } from "@/lib/content/modules";
import { DifficultyBadge } from "@/components/ui/Badge";
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  ClipboardList,
  Scale,
  Play,
  HelpCircle,
  FileCode2,
  TrendingUp,
  Clock,
  GitBranch,
} from "lucide-react";

const moduleIcons: Record<string, React.ElementType> = {
  "core-concepts": BarChart3,
  "credit-scoring": ClipboardList,
  "ml-models": BrainCircuit,
  regulation: Scale,
};

const moduleColors: Record<string, string> = {
  "core-concepts": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "credit-scoring": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  "ml-models": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
  regulation: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
};

const SAMPLE_CODE = `import numpy as np
from scipy.stats import norm

def irb_risk_weight(pd, lgd, r=0.15):
    k = lgd * norm.cdf(
        norm.ppf(pd) / (1-r)**0.5
        + (r/(1-r))**0.5 * norm.ppf(0.999)
    ) - lgd * pd
    return k * 12.5 * 100  # as %

# Senior corporate, BBB-rated
rw = irb_risk_weight(pd=0.01, lgd=0.45)
print(f"Risk Weight: {rw:.1f}%")
# → Risk Weight: 94.3%`;

export default function HomePage() {
  const totalChapters = MODULES.reduce((s, m) => s + m.chapters.length, 0);
  const totalMinutes = MODULES.reduce(
    (s, m) => s + m.chapters.reduce((cs, c) => cs + c.estimatedMinutes, 0),
    0
  );

  return (
    <div className="bg-white dark:bg-slate-950">
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {/* grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(#3b82f620 1px, transparent 1px), linear-gradient(90deg, #3b82f620 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <TrendingUp className="h-3.5 w-3.5" />
                Industry Practitioner Resource
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
                Credit Risk Modelling,{" "}
                <span className="text-blue-400">From Basel to XGBoost</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-xl">
                A hands-on curriculum for risk analysts, quants, and data scientists. Run Python
                directly in your browser — no setup, no account, no server.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/modules"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors"
                >
                  Start Learning
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="https://github.com/enjofaes/creditrisk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold text-sm transition-colors"
                >
                  <GitBranch className="h-4 w-4" />
                  GitHub
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
                <span>{totalChapters} chapters</span>
                <span>·</span>
                <span>~{Math.round(totalMinutes / 60)} hours</span>
                <span>·</span>
                <span>Free &amp; open source</span>
              </div>
            </div>

            {/* Code snippet */}
            <div className="rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
              <div className="flex items-center gap-1.5 px-4 py-3 bg-slate-800 border-b border-slate-700">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-amber-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs text-slate-400 font-mono">Python — Basel IRB</span>
              </div>
              <pre className="p-5 text-xs font-mono text-slate-200 bg-slate-900 overflow-x-auto leading-relaxed">
                <code>{SAMPLE_CODE}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODULE CARDS ────────────────────────────────────── */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Four Modules, Complete Coverage
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            From the expected loss formula to IFRS 9 staging — each module builds on the last.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {MODULES.map((module, i) => {
            const Icon = moduleIcons[module.slug] ?? BarChart3;
            const colorClass = moduleColors[module.slug];
            return (
              <Link
                key={module.slug}
                href={`/modules/${module.slug}`}
                className="group rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition-all"
              >
                <div className={`inline-flex p-2.5 rounded-xl ${colorClass} mb-4`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Module {i + 1}
                  </span>
                  <span className="text-xs text-slate-400">{module.chapters.length} chapters</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {module.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                  Explore module
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Learn by Doing
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Every chapter combines theory, interactive demonstrations, and assessments.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Play,
                color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                title: "Live Python",
                desc: "Run numpy, pandas, scikit-learn, XGBoost directly in the browser via Pyodide — zero setup.",
              },
              {
                icon: TrendingUp,
                color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
                title: "Interactive Charts",
                desc: "Drag sliders to explore how PD, LGD, and correlation affect Expected Loss, VaR, and capital.",
              },
              {
                icon: HelpCircle,
                color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300",
                title: "Chapter Quizzes",
                desc: "Test your understanding with application-level questions at the end of each chapter.",
              },
              {
                icon: FileCode2,
                color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
                title: "Jupyter Notebooks",
                desc: "Download extended notebooks with full data pipelines to run locally or in Google Colab.",
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6"
              >
                <div className={`inline-flex p-2.5 rounded-xl ${color} mb-4`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ────────────────────────────────── */}
      <section className="py-16 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
            Who Is This For?
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              title: "Risk Analysts",
              emoji: "📊",
              desc: "Build and validate PD/LGD scorecards, understand Basel capital requirements, and write model documentation that satisfies SR 11-7.",
            },
            {
              title: "Data Scientists",
              emoji: "🤖",
              desc: "Apply XGBoost and neural networks to credit data, use SHAP for regulatory explainability, and integrate ML into champion-challenger frameworks.",
            },
            {
              title: "Quantitative Researchers",
              emoji: "🔬",
              desc: "Deep-dive into the Basel IRB formula, Gaussian copula correlation models, IFRS 9 lifetime ECL, and portfolio credit VaR.",
            },
          ].map(({ title, emoji, desc }) => (
            <div
              key={title}
              className="rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center"
            >
              <div className="text-4xl mb-4">{emoji}</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-3">{title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CURRICULUM TABLE ─────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Full Curriculum
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              {totalChapters} chapters · {Math.round(totalMinutes / 60)}+ hours
            </p>
          </div>
          <div className="space-y-6">
            {MODULES.map((module, mi) => (
              <div
                key={module.slug}
                className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <div className="px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-0.5">
                    Module {mi + 1}
                  </p>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100">{module.title}</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {module.chapters.map((ch) => (
                    <div
                      key={ch.slug}
                      className="flex items-center gap-4 px-6 py-3"
                    >
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/modules/${module.slug}/${ch.slug}`}
                          className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {ch.title}
                        </Link>
                      </div>
                      <div className="hidden sm:flex items-center gap-3 shrink-0">
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          {ch.estimatedMinutes}m
                        </span>
                        <DifficultyBadge difficulty={ch.difficulty} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY NOTE ──────────────────────────────── */}
      <section className="py-16 lg:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          Runs Entirely in Your Browser
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
          Python code runs via{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-200">Pyodide</span> —
          a full CPython implementation compiled to WebAssembly. No server sends or receives your
          data. No account required. Pre-loaded packages include{" "}
          <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
            numpy
          </code>
          ,{" "}
          <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
            pandas
          </code>
          ,{" "}
          <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
            scikit-learn
          </code>
          ,{" "}
          <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
            matplotlib
          </code>
          , and{" "}
          <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-sm font-mono">
            xgboost
          </code>
          .
        </p>
        <Link
          href="/modules"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors"
        >
          Start the Course
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
