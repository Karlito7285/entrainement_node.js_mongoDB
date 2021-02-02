const Post = require("../models/series");
const path = require('path');

module.exports = (req, res)=>{

    const {image} = req.files

    const uploadFile = path.resolve(__dirname,'..' ,'public/images-articles', image.name);

    image.mv(uploadFile,(error)=>{

        Post.create(
            {
                ...req.body,
                image:`/images-articles/${image.name}`
            }
            
            , (error, post)=>{
        res.redirect('/')
    })
    
})
}