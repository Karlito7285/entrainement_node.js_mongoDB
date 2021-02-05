const Post = require("../models/series")

module.exports = async(req,res)=>{

    const series = await Post.findById(req.params.id)
    console.log(req.params);
    res.render('series',{series})
};