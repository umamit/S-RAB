// Shared types used across ProjectEditor sub-components

export interface ActiveEditState {
  categoryId: string;
  itemId: string;
  field: "name" | "unit" | "quantity" | "unitPrice" | "actualQuantity";
}

export type EditState = ActiveEditState | null;
export type CatEditState = string | null; // categoryId being edited
