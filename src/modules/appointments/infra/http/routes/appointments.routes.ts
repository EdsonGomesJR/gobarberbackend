import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentsController = new AppointmentController();
const providerAppointmentsController = new ProviderAppointmentsController();
const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
// validações de dados
appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create
);
appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
