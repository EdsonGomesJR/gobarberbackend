import 'reflect-metadata';
// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('SendForgotEmailPassword', () => {
  // irá executar antes de cada um dos testes
  // assim fica menos verboso e não precisamos declarar novamento dentro do it

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,

      fakeUserTokensRepository
    );
  });

  it('should be able to reset the password  ', async () => {
    // criar o usuario
    const user = await fakeUsersRepository.create({
      name: 'Jose',
      email: 'edz@eds.com',
      password: '123456',
    });

    // criar o token, pegando o id do usuario
    const { token } = await fakeUserTokensRepository.generate(user.id);

    // pegar o token e resetar o password
    await resetPasswordService.execute({
      password: '125468',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('125468');
  });
});
