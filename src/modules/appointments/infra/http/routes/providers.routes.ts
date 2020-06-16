import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const providersController = new ProvidersController();
const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;
