import express from 'express';
import { signupValidate, loginValidate } from '../middlewares/user.validate';
import auth from '../middlewares/auth';
import { registerUser, login } from '../controllers/user.controller';
import { getLesson } from '../controllers/lesson.controller';

const router = express.Router();

/* Sign Up */
router.post('/signup', signupValidate, registerUser);

/* Login */
router.post('/login', loginValidate, login);

/* Get Lesson */
router.get('/lesson', auth, getLesson);

export default router;