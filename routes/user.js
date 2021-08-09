const express = require("express")
const router = express.Router()
const user = require("../controllers/user")
const { authentication } = require("../middlewares/isAuth")
const { validation } = require("../middlewares/validation")
const { registerSchema1, registerSchema2, loginSchema } = require("../validation/user")

router
    .post("/register1", validation(registerSchema1), user.register1)
    .post("/register2", validation(registerSchema2), user.register2)
    .post("/login", validation(loginSchema), user.login)

module.exports = router