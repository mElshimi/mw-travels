import express from 'express';
import { changePassword, protectedRoute, signin, signup } from './auth.js';
import { validation } from '../../middleware/validation.js';
import { checkEmail } from '../../middleware/checkEmail.js';
import { changePasswordVal, signinVal, signupVal } from './auth.validation.js';

const authRouter = express.Router();


authRouter.post('/signup' ,validation(signupVal), checkEmail, signup)
authRouter.post('/signin' , validation(signinVal) , signin)
authRouter.patch('/changePassword' ,protectedRoute, validation(changePasswordVal) , changePassword)


export default authRouter