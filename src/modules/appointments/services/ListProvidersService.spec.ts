import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;

let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });
  it('should able to list the providers', async () => {
    // cria user
    const user1 = await fakeUsersRepository.create({
      name: 'Edson',
      email: 'edson@edson.com',
      password: '123456',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@tests.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Logged User',
      email: 'logged@logged.com',
      password: '123456',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
