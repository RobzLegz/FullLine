export interface RdxAction<T> {
  type: string;
  payload: T;
}
