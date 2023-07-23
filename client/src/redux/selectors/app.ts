import { IStoreState } from "client/src/interface";

export const usersConfigSelector = (state: IStoreState) => state.app.users;

export const configLoadingStatusSelector = (state: IStoreState) => state.app.loading;