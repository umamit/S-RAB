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
import TabNav from "./TabNav";
import TabDetail from "./TabDetail";
import PrintView from "./PrintView";
import type { TabType } from "./TabNav";

interface ProjectEditorProps {
  project: Project;
}

export default function ProjectEditor({ project }: ProjectEditorProps) {
  const [activeTab, setActiveTab] = useState<TabType>("detail");

  const totalDirectCost = project.subProjects.reduce((acc, sub) =>
    acc + sub.categories.reduce((subAcc, cat) =>
      subAcc + cat.items.reduce((sum, item) => sum + item.total, 0), 0), 0);

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Screen View */}
      <div className="print:hidden">
        {activeTab === "recap"    && <RecapSheet project={project} />}
        {activeTab === "schedule" && <ScheduleManager project={project} />}
        {activeTab === "daily"    && <DailyLogManager project={project} />}
        {activeTab === "progress" && <ProgressTracker project={project} />}
        {activeTab === "termin"   && <PaymentTerms project={project} />}
        {activeTab === "guide"    && <UserGuide />}
        {activeTab === "resource" && <ResourceSummary project={project} />}
        {activeTab === "ssh"      && <SSHCatalog project={project} />}
        {activeTab === "detail"   && <TabDetail project={project} totalDirectCost={totalDirectCost} />}
      </div>

      {/* Print-Only View */}
      <PrintView project={project} totalDirectCost={totalDirectCost} />
    </div>
  );
}
