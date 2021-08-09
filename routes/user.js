const express = require("express")
const router = express.Router()
const user = require("../controllers/user")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { registerSchema1,
    registerSchema2,
    loginSchema,
    verificationCodeSchema,
    forgetPasswordSchema
} = require("../validation/user")

router
    .post("/register1", validation(registerSchema1), user.register1)
    .patch("/register2", validation(registerSchema2), user.register2)
    .post("/login", validation(loginSchema), user.login)
    .get("/profile", authentication, user.profile)
    .patch("/send-verification-code", validation(verificationCodeSchema), user.sendVerificationCode)
    .patch("/forget-password", validation(forgetPasswordSchema), user.forgetPassword)

module.exports = router