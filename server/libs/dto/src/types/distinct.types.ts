export type FilterValue = string | string[];

export interface DistinctFilter {
  [columnName: string]: FilterValue;
}
