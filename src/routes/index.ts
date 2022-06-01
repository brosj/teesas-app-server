import express from 'express';
import userValidate from '../middlewares/user.validate';
import auth from '../middlewares/auth';
import { registerUser, login } from '../controllers/user.controller';
import { getLesson } from '../controllers/lesson.controller';

const router = express.Router();

/* Sign Up */
router.post('/signup', userValidate, registerUser);

/* Login */
router.post('/login', login);

/* Get Lesson */
router.get('/lesson', auth, getLesson);

export default router;