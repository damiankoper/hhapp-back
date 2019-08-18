import { Router } from 'express';
import SessionController from '../controllers/session.controller';

const SessionRouter: Router = Router();
const sessionController = new SessionController();

SessionRouter.post('/', sessionController.create);
/**
 * For future blacklist
 */
// SessionRouter.delete('/', sessionController.delete);

export default SessionRouter;
