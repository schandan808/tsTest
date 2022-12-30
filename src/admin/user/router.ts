import express from 'express'
const userRouters = express.Router()
import { test, newSS } from './controller'

userRouters.get("/tt", test)
userRouters.get("/tt2", newSS)

export { userRouters }