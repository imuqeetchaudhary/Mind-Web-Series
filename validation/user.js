const yup = require("yup")

exports.registerSchema1 = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    userName: yup.string().required()
})

exports.registerSchema2 = yup.object({
    userId: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(5).max(10)
})

exports.loginSchema = yup.object({
    email: yup.string().email(),
    userName: yup.string(),
    password: yup.string().required()
})