import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { TopNav } from "@/components/layout/TopNav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Credit Risk Modelling — From Basel to XGBoost",
  description:
    "A hands-on teaching resource for credit risk practitioners. Run Python in your browser, explore interactive charts, and master PD/LGD/EAD, scorecards, ML models, and Basel/IFRS 9 regulation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen bg-white dark:bg-slate-950 antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TopNav />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
