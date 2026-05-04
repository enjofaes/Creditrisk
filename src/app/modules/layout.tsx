import { PyodideProvider } from "@/components/python/PyodideProvider";
import { ModuleSidebar } from "@/components/layout/ModuleSidebar";

export default function ModulesLayout({ children }: { children: React.ReactNode }) {
  return (
    <PyodideProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-10">
          <ModuleSidebar className="hidden lg:block" />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </PyodideProvider>
  );
}
