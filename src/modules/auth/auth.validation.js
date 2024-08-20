import joi from 'joi'


const signupVal = joi.object({
    name:joi.string().min(2).max(30).required(),
    email:joi.string().email().required(),
    password:joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/).required(),
    Repassword:joi.valid(joi.ref('password')).required(),
})



const signinVal = joi.object({
    email:joi.string().email().required(),
    password:joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/).required(),
})

const changePasswordVal = joi.object({
    password:joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/).required(),
    newPassword:joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/).required(),
    Repassword:joi.valid(joi.ref('password')).required(),


})

export {
    signinVal,signupVal,changePasswordVal
}