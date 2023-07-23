import { User } from "@acme/shared-models";

export interface AppResponse<T> extends Response {
  data: T;
}

export type IAction<T> = {
  type: string;
  payload?: T;
};

export type IAppState = {
  users?: User[];
  loading?: boolean;
};


export type IStoreState = {
  app: IAppState;
};