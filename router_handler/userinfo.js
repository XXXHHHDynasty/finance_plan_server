const db = require('../db/index')

exports.getUserInfo = (req, res) => {
    const sql = `select id, username, nickname, email, user_pic from users where id=?`
    db.query(sql, req.user.id, (err, results) => {
        if (err)
            return res.cc(err)

        if (results.length !== 1)
            return res.cc('Failed to get user information!')

        res.send({
            status: 0,
            message: 'User information retrieved successfully!',
            data: results[0],
        })
    })
}

exports.updateUserInfo = (req, res) => {
    const sql = `update users set ? where id=?`
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err)
            return res.cc(err)

        if (results.affectedRows !== 1)
            return res.cc('Failed to update user information!')

        return res.cc('User information updated successfully!', 0)
    })
}

exports.updatePassword = (req, res) => {
    const sql = `select * from users where id=?`

    db.query(sql, req.user.id, (err, results) => {
        if (err)
            return res.cc(err)

        if (results.length !== 1)
            return res.cc('User does not exist!')

        // const bcrypt = require('bcryptjs')

        // const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        // if (!compareResult) return res.cc('原密码错误！')
        if (req.body.oldPwd != results[0].password)
            return res.cc('Incorrect original password!')

        const sql = `update users set password=? where id=?`

        // const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        db.query(sql, [req.body.newPwd, req.user.id], (err, results) => {
            if (err)
                return res.cc(err)

            if (results.affectedRows !== 1)
                return res.cc('Failed to update password!')

            res.cc('Password updated successfully!', 0)
        })
    })
}

exports.updateAvatar = (req, res) => {
    const sql = 'update users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err)
            return res.cc(err)

        if (results.affectedRows !== 1)
            return res.cc('Failed to update avatar!')

        return res.cc('Avatar updated successfully!', 0)
    })
}  