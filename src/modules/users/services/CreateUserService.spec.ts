import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

describe('CreateUser', () => {
  it('shoulbe able to create a new user', async () => {
    const fakeHashProvider = new FakeHashProvider();
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    const user = await createUser.execute({
      name: 'Edson',
      email: 'edson@edson.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });

  it('shoulbe not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
    await createUser.execute({
      name: 'Edson',
      email: 'edson@edson.com',
      password: '123456',
    });
    await expect(
      createUser.execute({
        name: 'Edson',
        email: 'edson@edson.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
