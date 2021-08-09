const { User } = require("../db/models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")
const { sendMail, code } = require("../middlewares/sendMail")

exports.register1 = promise(async (req, res) => {
    const body = req.body

    const userNameExists = await User.findOne({ userName: body.userName })
    if (userNameExists) throw new Exceptions.EmailExist("Username already exists")

    const newUser = new User({
        ...req.body,
    })

    await newUser.save()
    res.status(200).json({
        message: "Successfully completed part 1 of user registration",
        user: newUser
    })
})

exports.register2 = promise(async (req, res) => {
    const body = req.body

    const emailExists = await User.findOne({ email: body.email })
    if (emailExists) throw new Exceptions.EmailExist("Email already exists")

    const hash = bcrypt.hashSync(req.body.password, 10)
    const updateUser = await User.updateOne(
        { _id: body.userId },
        {
            $set: {
                email: body.email,
                password: hash,
                memberSince: Date.now()
            }
        }
    )

    const user = await User.findOne({ _id: body.userId })
    if (!user) throw new Exceptions.NotFound("User not found")

    res.status(200).json({
        message: "Successfully completed part 2 of user registration",
        user: user
    })
})

exports.login = promise(async (req, res) => {
    const body = req.body

    const user = await User.findOne({
        $or: [
            { email: body.email },
            { userName: body.userName }
        ]
    })
    if (!user) throw new Exceptions.CredentialsNotMatched()

    const matchedPassword = await bcrypt.compareSync(req.body.password, user.password)
    if (!matchedPassword) throw new Exceptions.CredentialsNotMatched()

    const token = await jwt.sign({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.ACCESS_TOKEN_SECRET)

    res.status(200).json({
        token: token,
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin
    })
})

exports.profile = promise(async (req, res) => {
    const user = await User.findOne({ email: req.user.email })
    res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        isAdmin: user.isAdmin
    })
})

exports.sendVerificationCode = promise(async (req, res) => {
    const body = req.body
    const user = await User.findOne({ email: body.email })
    if (!user) throw new Exceptions.NotFound("User not found")

    await User.updateOne(
        { email: body.email },
        {
            $set:
            {
                verificationCode: code
            }
        }
    )

    const message = `Dear User ${user.firstName} ${user.lastName}! Your verification code is ${code}.`
    console.log(message);
    sendMail(user.email, message, res)
})

exports.forgetPassword = promise(async (req, res) => {
    const body = req.body

    const user = await User.findOne({ email: req.body.email })
    if (!user) throw new Exceptions.NotFound("user not found")

    if (user.verificationCode == body.verificationCode) {
        const hash = bcrypt.hashSync(body.password, 10);
        await User.updateOne(
            { email: body.email },
            { $set: { password: hash } }
        )
        res.status(200).json({
            message: "Password Saved Successfully"
        })
    } else {
        throw new Exceptions.BadRequset("Invalid Verification Code")
    }
})

exports.updateProfile = promise(async (req, res) => {
    const body = req.body

    if (!body.password) {
        const updateUser = await User.updateOne(
            { _id: req.user._id },
            {
                $set: {
                    ...body,
                }
            }
        )
    }
    else {
        const hash = bcrypt.hashSync(body.password, 10)
        const updateUser = await User.updateOne(
            { _id: req.user._id },
            {
                $set: {
                    ...body,
                    password: hash
                }
            }
        )
    }

    res.status(200).json({ message: "Successfully updated user profile" })
})