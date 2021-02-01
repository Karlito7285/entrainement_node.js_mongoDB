const user = require('../models/user');

module.exports = (req, res, next)=>{
    //Connecte toi dans la base de donnée
user.findById(req.session.userId, (error, user)=>{
    if(error || !user) {
        return res.redirect('/')
    }
    next()
})

}