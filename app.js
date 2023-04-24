const express = require('express')
// Reate an instance of an Express server
const app = express()

const joi = require('joi')

const cors = require('cors')
// Register CORS as a global middleware
app.use(cors())

// Configure middleware for parsing form data
// Can only parse data in the application/x-www-form-urlencoded format
app.use(express.urlencoded({ extended: false }))

// Middleware for responding with data, Must be before the route
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            // Status description, determine whether err is an error object or a string
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

const config = require('./config')
// Middleware for parsing the token
const expressJWT = require('express-jwt')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))

// User routing module
const userRouter = require('./router/user')
app.use('/api', userRouter)

// User info routing module
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)


// Error middleware
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError)
        return res.cc(err)

    if (err.name === 'UnauthorizedError')
        return res.cc('Authentication failed!')

    // Unknown error
    res.cc(err)
})

app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007')
})
