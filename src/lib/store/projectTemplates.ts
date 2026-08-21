import type { SubProject } from "./types";
import { getRukoTemplate } from "./templates/rukoTemplate";
import { getPavingTemplate } from "./templates/pavingTemplate";
import { getDrainaseTemplate } from "./templates/drainaseTemplate";
import { getWebsiteTemplate } from "./templates/websiteTemplate";
import { getPortalTemplate } from "./templates/portalTemplate";

/**
 * Returns preset subprojects for S-RAB project templates
 */
export function getTemplateSubProjects(templateType: string): SubProject[] {
  const nowStr = String(Date.now());

  if (templateType === "ruko") return getRukoTemplate(nowStr);
  if (templateType === "paving") return getPavingTemplate(nowStr);
  if (templateType === "drainase") return getDrainaseTemplate(nowStr);
  if (templateType === "website") return getWebsiteTemplate(nowStr);
  if (templateType === "portal") return getPortalTemplate(nowStr);

  return [];
}
