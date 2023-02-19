import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { indexRouter } from './src/index'
import fileupload from 'express-fileupload'

import path from 'path'
const app = express()


app.use(express.static("public"))
app.set("views", path.join(__dirname, "views"));
app.use(fileupload());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', indexRouter)

try {
  mongoose.set("strictQuery", false);
  mongoose.connect(`${process.env.DATABASE}`);
  console.log("db connected");
} catch (error) {
  console.log(error, '==========')
}

app.listen(process.env.PORT, () => {
  console.log(`port running on ${process.env.PORT}`);
})