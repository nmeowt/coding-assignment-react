import { User } from "@acme/shared-models";
import { UserService } from "client/src/services";
import { Dispatch } from "react";

export const UPDATE_USER = 'UPDATE_USER';

export const loadUser = () => async (dispatch: Dispatch<any>) => {
  await UserService.getUsers().then(resp => resp.json())
    .then(data => {
      if (data) {
        dispatch(updateUser({ users: data, loading: false }));
      }
    }).catch(err => {
      dispatch(updateUser({ loading: false }));

      if (err) {
        console.error(err.err, 'loadUser|', err);
      }
    });
}

export const updateUser = (value: any) => ({
  type: UPDATE_USER,
  payload: value,
});