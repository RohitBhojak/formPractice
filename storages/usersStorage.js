class UsersStorage {
  constructor() {
    this.storage = {};
    this.id = 0;
  }

  addUser({ firstName, lastName, email, age = null, bio = null }) {
    const id = this.id;
    this.storage[id] = { id, firstName, lastName, email, age, bio };
    this.id++;
  }

  getUsers() {
    return Object.values(this.storage);
  }

  getUser(id) {
    return this.storage[id];
  }

  getUsersByName(name) {
    const query = name.trim().toLowerCase();
    return Object.values(this.storage).filter(
      (user) =>
        user.firstName.toLowerCase().includes(query) || user.lastName.toLowerCase().includes(query),
    );
  }

  updateUser(id, { firstName, lastName, email, age = null, bio = null }) {
    this.storage[id] = { id, firstName, lastName, email, age, bio };
  }

  deleteUser(id) {
    delete this.storage[id];
  }
}

module.exports = new UsersStorage();
