

const mongoose = require('mongoose');

var userSchema= mongoose.Schema({
    uID:String,
    urlImage:String,
    ImgName:{
        type:String,
        unique:false,
        required:false
    },
    address:String,
    contents:String,
    MoreContents: [{
        ImgFood:String,
        ImgNameFood:String,
        Price:String
    }]
})
module.exports=mongoose.model('contribute',userSchema);