const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    personalData: {
        name: {
            type: String
        },
        surname: {
            type: String
        },
        address: {
            type: String
        },
        phonenumber: {
            type: Number
        }
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const userModel = mongoose.model('users', userSchema)

module.exports = userModel