import { Request, Response } from 'express';
import { Users } from '../../../models';
import { uuid } from 'uuidv4';
import { success } from "../../common/helper";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../token';



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
        let filesname: any;
        filesname = req.files
        let imageName = uuid() + filesname.image.name
        let imgMove = filesname.image
        imgMove.mv(`public/uploads/${imageName}`, (error: string) => {
            if (error) {
                res.status(500).json(error);
            }
        })
        success(res, "image get successfully", { imageName })

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


// export { getUser, postUser, fileUpload, }