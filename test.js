const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://localhost:27017/test_my_database', {useNewUrlParser: true});
BlogPost.create({
    title: 'Đây là sách dạy học lập trình Node.js từ cơ bản',
    body: 'Nếu bạn đam mê với Javacript và muốn khai phá cách xây dựng ứng dụng với Node.js thì đây là cuôn sách dành cho bạn.'
}, (error, blogpost)=> {
    console.log(error, blogpost)
})

BlogPost.find({}, (error, blogpost)=>{
    console.log(error, blogpost)
})

