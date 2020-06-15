import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });
  it('shoulbe able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '121332160',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('121332160');
  });

  it('shoulbe not be able to create two appointments on the same date', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '121332160',
    });
    await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '121332160',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
