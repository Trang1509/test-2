const BlogPost = require('../models/BlogPost')
module.exports = (req, res) =>{
    BlogPost.find({})
    .then((posts) => {
        cononsole.log(req.session)
        console.log(posts);
        res.render('index',{
            blogposts: posts
        })
    })
    .catch(err => console.log(err))
}