const UserService = {
  getUsers: async () => {
    return fetch('/api/users');
  }
}

export default UserService;
