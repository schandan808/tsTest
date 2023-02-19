import { Request, response, Response } from 'express';
import { Users } from '../../../models';
import { uuid } from 'uuidv4';
import { success } from "../../common/helper";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../token';
import express from 'express'
import fileupload from 'express-fileupload'
import {Configuration, OpenAIApi} from "openai"
// const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey:"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",
  });

export const getUser = async (req: Request, res: Response) => {
    // console.log(req["token"].data.name);
    const token = req["token"].data
    console.log(token);
    const user = await Users.find();
    return res.json(user);
}
export const postUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    const getUser = await Users.findOne({ email: email });
    if (getUser) return res.json({ "message": "email all ready exist" });
    const userData = await Users.create(req.body);
    return res.json({ "userData": userData });
}

export const fileUpload = async (req: Request, res: Response) => {
    try {
      
        let filesname: fileupload.UploadedFile | fileupload.FileArray | undefined | null = req.files;
       


        let imageName = uuid() + (Array.isArray(filesname) ? filesname[0].name : filesname?.name);
        let imgMove = Array.isArray(filesname) ? filesname[0] : filesname;
        console.log(await imgMove?.mv())
        // let imgMove = filesname
        // imgMove?.mv(`public/uploads/${imageName}`, (error: string) => {
        //     if (error) {
        //         res.status(500).json(error);
        //     }
        // })
        // success(res, "image get successfully", { imageName })

    } catch (error) {
        console.log(error, '-----error')
    }
}
export const Login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const emaildata = await Users.findOne({ email: email })
        if (emaildata == null) {
            throw "email not extst please registor"
        }
        if (emaildata.password != password) {
            throw "password not match"
        }
        let token = jwt.sign({
            data: emaildata
        }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ data: emaildata, token })
    } catch (error) {
        console.log(error)
    }
}

export const Registor = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const emaildata = await Users.findOne({ email: email })
        if (emaildata) {
            return res.json("email allredy exist")
        }
        const data = await Users.create(req.body)
        return res.json(data)
    } catch (error) {
        console.log(error);

    }
}


export const chatGPT = async (req: Request, res :Response)=>{
    try {
        console.log("ddddddddddddddddddddd",req.body)

        const openai = new OpenAIApi(configuration);
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.text,
            "max_tokens": 300,
            "temperature": 0
          },
        //   {
        //     timeout: 1000,
        //     // headers: {
        //     //   "Example-Header": "example",
        //     // },
        //   }
          );
          console.log(completion.data.choices[0].text);
        res.json({data:completion.data.choices[0].text})
        } catch (error) {
      console.log(error)  
    }
}

// export { getUser, postUser, fileUpload, }