import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('should able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Edson',
      email: 'edson@edson.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });
    expect(profile.name).toBe('Edson');
    expect(profile.email).toBe('edson@edson.com');
  });

  it('should not able to show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing user',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
