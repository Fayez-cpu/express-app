import express from 'express'
import { getAllData } from '../controllers/getAllData.js'
import { getDataByPathParams } from '../controllers/getDataByPathParams.js'
import {authMiddleware} from '../middleware/authMiddleware.js'
export const apiRouter = express.Router()

apiRouter.get('/', authMiddleware, getAllData)

apiRouter.get('/:field/:term', authMiddleware, getDataByPathParams)