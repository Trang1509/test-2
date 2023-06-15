const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
 
const UserSchema = new Schema({
    username:{
       type: String,
       required: true,
       unique: true  //không được trùng lặp
    },

    password: {
        type: String,
        required: true // bắt buộc phải điền dữ liệu 
    }
});
//export model
const User = mongoose.model('User', UserSchema);
module.exports = User

UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password)
    .then((hash)=>{
        user.password = hash
        next()
    })
    .catch(err => console.log(err))

})
