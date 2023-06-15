const express = require('express')
const app = new express()
// const BlogPost = require('./models/BlogPost')
// const path = require('path')
const ejs = require('ejs')
app.set('view engine', 'ejs')

app.use(express.static('public'))


//Kết nối với trang web localhost
app.listen(4000, () =>{
    console.log("App listening on port 4000")
})
//Kết nối với mongodb
const mongoose = require('mongoose');
const { DiffieHellmanGroup } = require('crypto')
mongoose.connect('mongodb://0.0.0.0:27017/myDatabase', {useNewUrlParser:true})
.then(()=>{
    console.log("successfully   ");
})
.catch(err => console.log(err))


//Hàm tạo và lưu data lên mongodb
// const Blog = new BlogPost({
//     title: "Đây là",
//     body: "nếu"
// })
// Blog.save()
//    .then(() =>{
//     console.log("lưu thành công");
//    })
//    .catch((err)=>{
//     console.log(err);
//    })

//Hàm tìm dữ liệu
// BlogPost.find({title: "day la"})
//     .then((result) => {
//         console.log("tim thanh cong: ", result);
//     })
//     .catch(err => console.log(err))



//Hàm upđate data
// var id = "5cb436980b33147489eadfbb";
// BlogPost.findByIdAndUpdate(id, {
//     title: 'Updated title'})
//     .then((result) => {
//         console.log("ket qua: " + result);
//     })
//     .catch(errors => console.log (errors))

//Hàm xóa data
// var id = "648875e1eb0c338e5973a5f6";
//     BlogPost.findByIdAndDelete(id)
//         .then((result) => {console.log("xoa id: ", result)})
//         .catch(errors => console.log (errors))

const newPostController = require('./controllers/newPost')

app.get('/posts/new', newPostController)


// app.get('/', (req, res) =>{
//     BlogPost.find()
//     .then((posts)=>{
//         console.log(posts);
//         response.render('index',{
//         blogposts: posts  //dữ liệu trả về được gán cho biến blogpost
//       });
//     })
//     .catch (err=>{console.log(err)})
        
// })


app.get('/about', (req,res)=>{
    res.render('about')
})
app.get('/contact', (req,res)=>{
    res.render('contact')
})
// app.get('/post/:id', (req,res)=>{
//     BlogPost.findById(req.params.id)
//       .then((detailPost)=>{
//         res.render('post', { detailPost});
//       })
//       .catch(err => console.error(err))
//   })

//xử lí dữ liệu từ trình duyệt thông qua trường req.body
// app.post('/posts/store', (req, res)=>{
//     console.log(req.body)
//     res.redirect('/')
// })

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const fileUpload = require('express-fileupload')
app.use(fileUpload())

//lưu dữ liệu vào BlogPost
// app.post('/posts/store', function (req, res) {
//     let image = req.files.image;
//     image.mv(path.resolve(__dirname, 'public/upload', image.name), function (error) {
//     BlogPost.create({...req.body,image: '/upload/' + image.name}, function (err) {
//     res.redirect('/')
//      })
//    })
// })


//Middleware tùy chỉnh
// const customMiddleWare = (req, res, next) => {
//     console.log('Custom middle ware called')
//     next()
// }
// app.use(customMiddleWare)

//validateMiddleWare kiểm tra tất cả fields gửi lên có bị null k
const validateMiddleWare = require('./middleware/validationMiddleware');
app.use('/posts/store', validateMiddleWare)

app.use('/posts/new', validateMiddleWare) //mỗi khi request tới url thì express sẽ thực thi validateMiddleWare
// lưu ý: cần phải để đoạn code validateMiddleWare dưới đoạn app.use((upload))

//import những controllers 
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')

app.get('/', homeController)
app.get('/post/:id', getPostController )
app.post('/posts/store', storePostController)
app.get('/auth/register', newUserController)


const storeUserController = require('./controllers/storeUser')
app.post('/users/register', storeUserController)

const loginController = require('./controllers/login')
app.get('/auth/login', loginController);

const loginUserController = require('./controllers/loginUser')
app.get('/users/login', loginUserController);

//giữ phiên đăng nhập trên web 
const expressSession = require('express-session')
app.use(expressSession({
    secret: 'keyboard cat'
}))
