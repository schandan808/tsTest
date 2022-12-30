import { Request, Response } from 'express'

const test = async (req: Request, res: Response) => {
    res.send('hello user test')
}
const newSS = async (req: Request, res: Response) => {
 
    res.send('hello user test22222')
}


export { test, newSS, }