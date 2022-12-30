import express from 'express'
const indexRouter = express.Router()
import {apiRouter,} from './api/index'
import {adminRouter} from './admin/index'

indexRouter.use('/api',apiRouter)
indexRouter.use('/admin',adminRouter)



export { indexRouter }