const db = require('../db/index')
// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {
    const userinfo = req.body

    // Check if the data is valid
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, message: 'Username or password cannot be empty!' })
    }

    // Check if the username is already taken
    const sqlStr = `select * from users where username=?`
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err)
            return res.cc(err)

        // Username is already taken
        if (results.length > 0)
            return res.cc('Username is already taken, please choose another one!')

        // userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        // Insert a user
        const sql = 'insert into users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err)
                return res.cc(err)

            // Failed to register user
            if (results.affectedRows !== 1)
                return res.cc('Failed to register user. Please try again later!')

            res.cc('Registration successful!', 0)
        })
    })
}

exports.login = (req, res) => {
    const userinfo = req.body

    const sql = `select * from users where username=?`
    db.query(sql, [userinfo.username], (err, results) => {
        if (err)
            return res.cc(err)

        if (results.length !== 1)
            return res.cc('Login Failed')

        // const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        // if (!compareResult)
        //     return res.cc('Login failed!')
        if (userinfo.password != results[0].password)
            return res.cc('Password does not match!')

        // Generate a token string on the server side
        // Exclude password and user_pic
        const user = { ...results[0], password: '', user_pic: '' }

        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn // Token expiration period
        })

        res.send({
            status: 0,
            message: 'Login successful!',
            // For the convenience of the client using the token, directly concatenate the prefix "Bearer" on the server side
            token: 'Bearer ' + tokenStr,
        })
    })
}