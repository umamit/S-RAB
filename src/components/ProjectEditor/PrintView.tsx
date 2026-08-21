import { formatRupiah } from "@/lib/excel-export";
import type { Project } from "@/lib/store";
import RecapSheet from "@/components/RecapSheet";
import DailyLogManager from "@/components/DailyLogManager";
import ProgressTracker from "@/components/ProgressTracker";
import ResourceSummary from "@/components/ResourceSummary";
import type { PrintMode } from "./ProjectEditor";
import SSHCatalog from "@/components/SSHCatalog";
import PaymentTerms from "@/components/PaymentTerms";
import Addendum from "@/components/Addendum";
import CCO from "@/components/CCO";
import BASTPrintView from "@/components/BASTManager/BASTPrintView";
import PrintSubProject from "./PrintSubProject";

interface PrintViewProps {
  project: Project;
  totalDirectCost: number;
  printMode: PrintMode;
  printSubId: string | null;
  printItemId: string | null;
}

export default function PrintView({ 
  project, 
  totalDirectCost, 
  printMode, 
  printSubId, 
  printItemId 
}: PrintViewProps) {
  const showRecap = printMode === "all" || printMode === "recap-only";
  const showDaily = printMode === "all" || printMode === "daily-only";
  const showProgress = printMode === "all" || printMode === "progress-only";
  const showResource = printMode === "all" || printMode === "resource-only";
  const showSSH = printMode === "ssh-only";
  const showTermin = printMode === "termin-only";
  const showAddendum = printMode === "addendum-only";
  const showCCO = printMode === "cco-only";
  const showBAST = printMode === "bast-only";

  const subprojectsToPrint = project.subProjects.filter((sub) => {
    if (printMode === "single-sub") return sub.id === printSubId;
    return printMode === "all";
  });

  return (
    <div className="hidden print:block space-y-12 bg-white text-zinc-950 p-2">
      {/* Recap Sheet */}
      {showRecap && (
        <div>
          <RecapSheet project={project} />
        </div>
      )}

      {/* Sub Projects Details */}
      {subprojectsToPrint.map((sub) => (
        <PrintSubProject 
          key={sub.id} 
          sub={sub} 
          project={project} 
          totalDirectCost={totalDirectCost} 
        />
      ))}

      {/* Daily Logs */}
      {showDaily && (
        <div className="print-break-before space-y-4">
          <DailyLogManager project={project} />
        </div>
      )}

      {/* Progress & S-Curve */}
      {showProgress && (
        <div className="print-break-before space-y-4">
          <ProgressTracker project={project} />
        </div>
      )}

      {/* Resource Summary */}
      {showResource && (
        <div className="print-break-before space-y-4">
          <ResourceSummary project={project} />
        </div>
      )}

      {/* SSH Catalog */}
      {showSSH && (
        <div className="space-y-4">
          <SSHCatalog project={project} />
        </div>
      )}

      {/* Payment Terms */}
      {showTermin && (
        <div className="space-y-4">
          <PaymentTerms project={project} />
        </div>
      )}

      {/* Addendum */}
      {showAddendum && (
        <div className="space-y-4">
          <Addendum project={project} />
        </div>
      )}

      {/* CCO */}
      {showCCO && (
        <div className="space-y-4">
          <CCO project={project} />
        </div>
      )}

      {/* BAST */}
      {showBAST && project.bastDetails && (
        <div className="space-y-4">
          <BASTPrintView project={project} bast={project.bastDetails} />
        </div>
      )}
    </div>
  );
}

