const mongoose = require("mongoose")
const schema = mongoose.Schema

const userSchema = new schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: Number
    },
    memberSince: {
        type: Date,
    }
})

exports.User = mongoose.model("User", userSchema)