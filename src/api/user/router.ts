import express from 'express'
import { getUser, postUser,fileUpload,Login,Registor } from './Controller'
import {auth} from '../../token'
const userRouters = express.Router()

userRouters.get("/getUser",auth, getUser)
userRouters.post("/postUser", postUser)
userRouters.post("/fileUpload", fileUpload)
userRouters.post('/login',Login)
userRouters.post('/Registor',Registor)


export { userRouters }