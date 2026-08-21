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
      {subprojectsToPrint.map((sub) => {
        const subtotal = sub.categories.reduce((acc, cat) =>
          acc + cat.items.reduce((sum, item) => sum + item.total, 0), 0);
        const subWeight = totalDirectCost > 0 ? (subtotal / totalDirectCost) * 100 : 0;

        return (
          <div key={sub.id} className="print-break-before space-y-4">
            <div className="border-b-2 border-zinc-800 pb-2">
              <h2 className="text-base font-bold uppercase tracking-tight text-center text-black">
                Rincian Pekerjaan: {sub.name.toUpperCase()}
              </h2>
              <div className="flex justify-between text-[10px] mt-1 italic font-medium text-zinc-650">
                <span>Proyek: {project.name}</span>
                <span>Bobot Divisi: {subWeight.toFixed(2)}% | Subtotal: {formatRupiah(subtotal)}</span>
              </div>
            </div>

            {sub.categories.map((category) => {
              const catSubtotal = category.items.reduce((sum, i) => sum + i.total, 0);
              const catWeight = totalDirectCost > 0 ? (catSubtotal / totalDirectCost) * 100 : 0;
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold bg-zinc-100 px-2 py-1 border border-zinc-400">
                    <span className="text-black">{category.name.toUpperCase()}</span>
                    <span className="text-black">Subtotal: {formatRupiah(catSubtotal)} ({catWeight.toFixed(2)}%)</span>
                  </div>
                  <table className="w-full text-[10px] border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border border-zinc-400 font-bold">
                        <th className="py-1 px-2 w-8 text-center border border-zinc-400 text-black">No.</th>
                        <th className="py-1 px-2 border border-zinc-400 text-black">Uraian Pekerjaan</th>
                        <th className="py-1 px-2 w-14 text-center border border-zinc-400 text-black">Satuan</th>
                        <th className="py-1 px-2 w-16 text-right border border-zinc-400 text-black">Vol Rencana</th>
                        <th className="py-1 px-2 w-16 text-right border border-zinc-400 text-black">Vol Realisasi</th>
                        <th className="py-1 px-2 w-24 text-right border border-zinc-400 text-black">Harga Satuan</th>
                        <th className="py-1 px-2 w-16 text-right border border-zinc-400 text-black">Bobot (%)</th>
                        <th className="py-1 px-2 w-28 text-right border border-zinc-400 text-black">Jumlah Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {category.items.map((item, index) => {
                         const itemWeight = totalDirectCost > 0 ? (item.total / totalDirectCost) * 100 : 0;
                         return (
                           <tr key={item.id} className="border border-zinc-400 text-black">
                             <td className="py-1 px-2 text-center border border-zinc-400">{index + 1}</td>
                             <td className="py-1 px-2 border border-zinc-400">{item.name}</td>
                             <td className="py-1 px-2 text-center border border-zinc-400">{item.unit}</td>
                             <td className="py-1 px-2 text-right border border-zinc-400">{item.quantity}</td>
                             <td className="py-1 px-2 text-right border border-zinc-400">{item.actualQuantity ?? 0}</td>
                             <td className="py-1 px-2 text-right border border-zinc-400">{formatRupiah(item.unitPrice)}</td>
                             <td className="py-1 px-2 text-right border border-zinc-400">{itemWeight.toFixed(2)}%</td>
                             <td className="py-1 px-2 text-right font-bold border border-zinc-400">{formatRupiah(item.total)}</td>
                           </tr>
                         );
                      })}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        );
      })}

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

