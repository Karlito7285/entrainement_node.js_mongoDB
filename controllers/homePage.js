const Post = require("../models/series")


module.exports = async(req, res)=>{
    const posts = await Post.find({})
    
    res.render('index',
    {posts})
}