

const mongoose = require('mongoose');

var userSchema= mongoose.Schema({
    uID:String,
    addminCheck:String,
    urlImage:String,
    ImgName:{
        type:String,
        unique:false,
        required:false
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
        uid: {
            type:String,
            unique:false,
            required:false
        },
        content: {
            type:String,
            unique:false,
            required:false
        },
        name:{
            type:String,
            unique:false,
            required:false
        },
        imgprofile: {
            type:String,
            unique:false,
            required:false
        }

    }]
})
module.exports=mongoose.model('poster',userSchema);