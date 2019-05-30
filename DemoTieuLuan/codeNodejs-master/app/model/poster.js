

const mongoose = require('mongoose');

var userSchema= mongoose.Schema({
    urlImage:String,
    ImgName:{
        type:String,
        unique:true,
        required:true,
    },
    address:String,
    kinhdo:String,
    vido:String,
    contents:String,
    MoreContents: [{
        ImgFood:String,
        ImgNameFood:String,
        Price:String
    }],
    Comments:[{
        uid: String,
        content: String,
        name:String,
        imgprofile: String

    }]
})
module.exports=mongoose.model('poster',userSchema);