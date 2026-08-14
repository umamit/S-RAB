import type { StateCreator } from "zustand";
import type { RABState } from "./types";
import { createProjectCrud } from "./projectCrud";
import { createSubProjectCrud } from "./subprojectCrud";
import { createCategoryCrud } from "./categoryCrud";
import { createItemCrud } from "./itemCrud";
import { createPaymentTermActions } from "./paymentTermActions";
import { createChangeOrderActions } from "./changeOrderActions";
import { createAuditActions } from "./auditActions";

export const createProjectActions = (
  set: Parameters<StateCreator<RABState>>[0],
  get: Parameters<StateCreator<RABState>>[1]
): Pick<
  RABState,
  | "addProject" | "importProject" | "deleteProject" | "updateProject" | "setActiveProject" | "updateProjectDuration"
  | "saveCustomAHSPTemplate" | "deleteCustomAHSPTemplate"
  | "addSubProject" | "deleteSubProject" | "updateSubProjectName" | "setActiveSubProject"
  | "addCategory" | "deleteCategory" | "updateCategory" | "updateCategorySchedule"
  | "addItem" | "updateItem" | "deleteItem" | "updateItemAHSP" | "updateItemActualQuantity"
  | "addPaymentTerm" | "updatePaymentTerm" | "deletePaymentTerm"
  | "addAddendum" | "deleteAddendum" | "addAddendumItem" | "deleteAddendumItem"
  | "addCCO" | "deleteCCO" | "updateCCOStatus" | "addCCOItem" | "deleteCCOItem"
  | "addAuditLog"
> => ({
  ...createProjectCrud(set, get),
  ...createSubProjectCrud(set),
  ...createCategoryCrud(set),
  ...createItemCrud(set),
  ...createPaymentTermActions(set),
  ...createChangeOrderActions(set, get),
  ...createAuditActions(set, get),
});
