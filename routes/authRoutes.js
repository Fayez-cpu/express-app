import express from 'express'
import { login, signup, logout } from '../controllers/authControllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const authRouter = express.Router()

authRouter.post('/signup', signup)
authRouter.post('/login', login)
authRouter.post('/logout', logout) 




