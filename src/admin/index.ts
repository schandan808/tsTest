import express from 'express'
const adminRouter = express.Router()
import {userRouters} from './user/router'

adminRouter.use('/',userRouters)

export { adminRouter }