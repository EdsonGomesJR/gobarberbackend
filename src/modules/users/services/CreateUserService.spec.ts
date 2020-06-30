import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });
  it('shoulbe able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Edson',
      email: 'edson@edson.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });

  it('shoulbe not be able to create a new user with same email from another', async () => {
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
