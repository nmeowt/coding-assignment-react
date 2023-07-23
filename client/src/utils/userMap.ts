import { User } from "@acme/shared-models";

export function UserMap(users: User[]) {
  const map = new Map();
  users.forEach((user: User) => {
    map.set(user.id, user.name);
  });

  return map;
}