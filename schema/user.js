const joi = require('joi')

// Validation rules for username and password
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi
    .string()
    .pattern(/^[\S]{6,12}$/)
    .required()

// Validation rules for id, nickname, and email
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

// Validation rules for avatar
const avatar = joi.string().dataUri().required()

// Validation rules object for registration and login forms
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// Validation rules object for updating user info
exports.update_userinfo_schema = {
    body: {
        id,
        nickname,
        email
    }
}

// Validation rules object for updating password
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// Validation rules object for updating avatar
exports.update_avatar_schema = {
    body: {
        avatar
    }
}
