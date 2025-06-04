import { Router } from 'express';
import { register, login, tokenIsValid, getUserData, } from '../Controllers/auth.controller';
import auth from '../Middleware/auth';

const router = Router();
router.get('/getUser', auth, getUserData );
router.post('/register', register);
router.post('/login', login);
router.post('/tokenIsValid', tokenIsValid);

export default router;
