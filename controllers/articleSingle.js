const Post = require("../models/series")

module.exports = async(req,res)=>{

    const serie = await Post.findById(req.params.id)
    console.log(req.params);
    res.render('series',{serie})
};