const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')
mongoose.connect('mongodb://0.0.0.0:27017/myDatabase', {useNewUrlParser: true});

const Blog = new BlogPost({
    title:'Đây là sách dạy học lập trình node.js từ cơ bản',
    body:'Nếu bạn đam mê với Javascript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là cuốn sách dành cho bạn.'
  })
  Blog.save(Blog)
    .then(()=>{
      console.log("lưu thành công");
    })
    .catch((err)=>{
      console.log(err);
    })
BlogPost.find()


