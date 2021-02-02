const effacer = require('../models/series')

module.exports = (req,res)=>{

    effacer.deleteOne    (
        {_id: req.params.id
        }, (err)=>{
            if (!err)
            res.redirect("/")
            else console.log(err)
        })
};