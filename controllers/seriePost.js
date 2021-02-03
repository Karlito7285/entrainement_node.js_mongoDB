const Post = require("../models/series");
const path = require('path');

module.exports = (req, res)=>{

    const {image} = req.files

    const uploadFile = path.resolve(__dirname,'..' ,'public/image-serie', image.name);

    image.mv(uploadFile,(error)=>{

        Post.create(
            {
                ...req.body,
                image:`/image-serie/${image.name}`
            }
            
            , (error, post)=>{
        res.redirect('/')
    })
    
})
}