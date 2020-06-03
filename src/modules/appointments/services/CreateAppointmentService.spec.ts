import 'reflect-metadata';
import CreateAppointmentService from './CreateAppointmentService';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';

describe('CreateAppointment', () => {
  it('shoulbe able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentRepository
    );
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '121332160',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('121332160');
  });
});
