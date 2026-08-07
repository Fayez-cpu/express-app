import express from 'express'
import { dashboard } from '../controllers/dashboardControllers.js'
import {authMiddleware} from '../middleware/authMiddleware.js'
export const dashboardRouter = express.Router()

dashboardRouter.get('/',authMiddleware, dashboard)