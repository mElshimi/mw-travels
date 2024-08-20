import { userModel } from '../../dataBase/models/user.model.js';
import { AppError } from '../utils/AppError.js';


export const checkEmail =async (req,res,next)=>{
const user = await userModel.findOne({email:req.body.email})
if (user) next (new AppError ('email already exists' , 409))
next()
    
}