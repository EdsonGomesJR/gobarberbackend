import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticate';

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const usersRouter = Router();
const upload = multer(uploadConfig.multer);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update
);

export default usersRouter;
