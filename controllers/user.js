const { User } = require("../db/models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Exceptions = require("../utils/custom-exceptions")
const { promise } = require("../middlewares/promises")

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
                password: hash
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
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.ACCESS_TOKEN_SECRET)

    res.status(200).json({
        token: token,
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
})

