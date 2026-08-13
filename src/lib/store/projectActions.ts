import type { StateCreator } from "zustand";
import type { RABState } from "./types";
import { createProjectCrud } from "./projectCrud";
import { createSubProjectCrud } from "./subprojectCrud";
import { createCategoryCrud } from "./categoryCrud";
import { createItemCrud } from "./itemCrud";

export const createProjectActions = (
  set: Parameters<StateCreator<RABState>>[0],
  get: Parameters<StateCreator<RABState>>[1]
): Pick<
  RABState,
  | "addProject" | "deleteProject" | "updateProject" | "setActiveProject" | "updateProjectDuration"
  | "addSubProject" | "deleteSubProject" | "updateSubProjectName" | "setActiveSubProject"
  | "addCategory" | "deleteCategory" | "updateCategory" | "updateCategorySchedule"
  | "addItem" | "updateItem" | "deleteItem" | "updateItemAHSP"
> => ({
  ...createProjectCrud(set, get),
  ...createSubProjectCrud(set),
  ...createCategoryCrud(set),
  ...createItemCrud(set),
});
