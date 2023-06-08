const express = require('express')
const app = new express()


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

// // app.get("/about", (req,res) =>{
// //   res.send('the about page')
// // }) 
// //  app.get("/contact", (req,res) => {
// //   res.send('The contact page')
// //  })
// //  app.get("/", (req,res) =>{
// //   res.send('The home page')
// //  })


// app.get('/about', (req,res)=>{
//   res.sendFile(path.resolve(__dirname, 'about.html'))
// })
// app.get('/contact', (req,res) => {
//   res.sendFile(path.resolve(__dirname, 'contact.html') )
// })
// app.get('*', function (req,res){
//   res.header(404)
//   res.send('page not found')
// })
app.use(express.static('public'))
app.listen(4000, () =>{
  console.log('App listening on port 4000')
})

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my_database', {useNewUrlParser: true})

app.get('/posts/new', (req,res) =>{
   res.render('create')
})