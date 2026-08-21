import type { StateCreator } from "zustand";
import type { RABState } from "./types";
import { createAddendumActions } from "./actions/addendumActions";
import { createCCOActions } from "./actions/ccoActions";

export const createChangeOrderActions = (
  set: Parameters<StateCreator<RABState>>[0],
  get: Parameters<StateCreator<RABState>>[1]
): Pick<
  RABState,
  | "addAddendum" | "deleteAddendum" | "addAddendumItem" | "deleteAddendumItem"
  | "addCCO" | "deleteCCO" | "updateCCOStatus" | "addCCOItem" | "deleteCCOItem"
> => ({
  ...createAddendumActions(set, get),
  ...createCCOActions(set, get),
});
