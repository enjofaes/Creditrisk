import { FileCode2, Download } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface NotebookDownloadProps {
  notebookPath: string;
  title: string;
  description?: string;
  packageList?: string[];
}

export function NotebookDownload({ notebookPath, title, description, packageList }: NotebookDownloadProps) {
  return (
    <div className="my-8 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-violet-100 dark:bg-violet-900/30 p-3">
          <FileCode2 className="h-6 w-6 text-violet-600 dark:text-violet-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">{title}</p>
          {description && (
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{description}</p>
          )}
          {packageList && packageList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {packageList.map((pkg) => (
                <Badge key={pkg} variant="slate" className="font-mono">
                  {pkg}
                </Badge>
              ))}
            </div>
          )}
          <a
            href={notebookPath}
            download
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Notebook
          </a>
        </div>
      </div>
    </div>
  );
}
