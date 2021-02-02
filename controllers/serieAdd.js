module.exports = (req, res)=>{


    if(req.session.userId){
            return res.render('add')
    }
    res.redirect('/user/login')
            
    }