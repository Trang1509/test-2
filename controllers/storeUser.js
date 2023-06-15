const User = require('../models/User.js')

module.exports = (req, res) => {
    User.create(req.body)
    .then ((user)=>{
        res.redirect('/')
    })
    .catch(err =>{
        return res.redirect('/auth/register')
    })
}
        
        
//         (error, user) => {
//         if (error) {
//             return res.redirect('/auth/register')
//         }
//         res.redirect('/')
//     })
// }