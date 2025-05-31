import { Router } from 'express';
import { register, login, tokenIsValid } from '../Controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/tokenIsValid', tokenIsValid);

export default router;
