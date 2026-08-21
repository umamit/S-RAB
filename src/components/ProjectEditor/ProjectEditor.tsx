"use client";
import { useState } from "react";
import type { Project } from "@/lib/store";
import RecapSheet from "@/components/RecapSheet";
import ScheduleManager from "@/components/ScheduleManager";
import DailyLogManager from "@/components/DailyLogManager";
import ProgressTracker from "@/components/ProgressTracker";
import UserGuide from "@/components/UserGuide";
import ResourceSummary from "@/components/ResourceSummary";
import SSHCatalog from "@/components/SSHCatalog";
import PaymentTerms from "@/components/PaymentTerms";
import Addendum from "@/components/Addendum";
import CCO from "@/components/CCO";
import BASTManager from "@/components/BASTManager";
import AuditTrail from "@/components/AuditTrail";
import TabNav from "./TabNav";
import TabDetail from "./TabDetail";
import PrintView from "./PrintView";
import type { TabType } from "./TabNav";

export type PrintMode = 
  | "all" 
  | "single-sub" 
  | "recap-only" 
  | "daily-only" 
  | "progress-only" 
  | "bast-only" 
  | "resource-only" 
  | "addendum-only" 
  | "cco-only" 
  | "ssh-only"
  | "schedule-only"
  | "termin-only";

interface ProjectEditorProps {
  project: Project;
}

export default function ProjectEditor({ project }: ProjectEditorProps) {
  const [activeTab, setActiveTab] = useState<TabType>("detail");
  const [printMode, setPrintMode] = useState<PrintMode>("all");
  const [printSubId, setPrintSubId] = useState<string | null>(null);
  const [printItemId, setPrintItemId] = useState<string | null>(null);

  const totalDirectCost = project.subProjects.reduce((acc, sub) =>
    acc + sub.categories.reduce((subAcc, cat) =>
      subAcc + cat.items.reduce((sum, item) => sum + item.total, 0), 0), 0);

  const triggerPrint = (mode: PrintMode, subId: string | null = null, itemId: string | null = null) => {
    setPrintMode(mode);
    setPrintSubId(subId);
    setPrintItemId(itemId);
    setTimeout(() => {
      window.print();
      setPrintMode("all");
      setPrintSubId(null);
      setPrintItemId(null);
    }, 150);
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Screen View */}
      <div className="print:hidden">
        {activeTab === "recap"    && <RecapSheet project={project} triggerPrint={triggerPrint} />}
        {activeTab === "schedule" && <ScheduleManager project={project} triggerPrint={triggerPrint} />}
        {activeTab === "daily"    && <DailyLogManager project={project} triggerPrint={triggerPrint} />}
        {activeTab === "progress" && <ProgressTracker project={project} triggerPrint={triggerPrint} />}
        {activeTab === "termin"   && <PaymentTerms project={project} triggerPrint={triggerPrint} />}
        {activeTab === "addendum" && <Addendum project={project} triggerPrint={triggerPrint} />}
        {activeTab === "cco"      && <CCO project={project} triggerPrint={triggerPrint} />}
        {activeTab === "bast"     && <BASTManager project={project} triggerPrint={triggerPrint} />}
        {activeTab === "history"  && <AuditTrail project={project} />}
        {activeTab === "guide"    && <UserGuide />}

        {activeTab === "resource" && <ResourceSummary project={project} triggerPrint={triggerPrint} />}
        {activeTab === "ssh"      && <SSHCatalog project={project} triggerPrint={triggerPrint} />}
        {activeTab === "detail"   && <TabDetail project={project} totalDirectCost={totalDirectCost} triggerPrint={triggerPrint} />}
      </div>

      {/* Print-Only View */}
      <PrintView 
        project={project} 
        totalDirectCost={totalDirectCost} 
        printMode={printMode}
        printSubId={printSubId}
        printItemId={printItemId}
      />
    </div>
  );
}
