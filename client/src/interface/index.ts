export interface AppResponse<T> extends Response {
  data: T;
}