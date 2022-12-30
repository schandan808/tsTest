
import mongoose, { Schema } from 'mongoose';
let UserSchma = new Schema({
    name:String,
    role:Number, // 1= Student,  2 = teacher
    email:String,
    password:String,
    accessToken:String,
    otp:Number
},{
    timestamps:true
})
export const Users= mongoose.model('Users', UserSchma);

// export{
//     Users
// }