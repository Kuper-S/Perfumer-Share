const { createUser, getUser } = require('../controllers/UserController');

describe('User module', () => {
    test('createUser function creates a new user', () => {
      const user = createUser('Tomi', 'Tomy', 'example@example5.com', 'password');
      expect(user.firstName).toBe('Tomi');
      expect(user.lastName).toBe('Tomy');
      expect(user.email).toBe('example@example5.com');
      expect(user.password).toBe('password');
    });
  
  test('example test', () => {
    expect(1 + 1).toBe(2);
  });

  test('getUserById function returns a user by ID', () => {
    const user = createUser('Tomi', 'Tomy', 'example@example5.com', 'password');
    const foundUser = getUser(user.id);
    expect(foundUser).toEqual(user);
  });
});
