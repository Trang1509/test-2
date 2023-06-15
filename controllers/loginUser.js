const bcrypt = require('bcrypt')  //dùng đã mã hóa password
const User = require('../models/User')

module.exports = (req, res) =>{
    const {username, password} = req.body;
    User.findOne({ username: username }) //để query vào Db xem có user tồn tại không
    .then((user)=>{
        bcrypt.compare(password, user.password)
           .then((same) =>{ //tiến hành so sánh mật khẩu
            req.session.userId = user._id;
            res.redirect('/')
           })
           .catch(err =>{
            res.redirect('/auth/login')
           })
    })
    .catch(err =>{
        res.redirect('/auth/login')
    })
}