export type Id = string | number;
export interface BaseState<T> {
  data: T[];
  selected: T | null;
  isLoading: boolean;
  error: boolean;
}