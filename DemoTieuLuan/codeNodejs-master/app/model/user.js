

const mongoose = require('mongoose');

var userSchema= mongoose.Schema({
    uid:String,
    name:String,
    imgprofile: {
        type:String,
        unique:false,
        required:false
    },
    SaveStore: [{
        idStore:{
            type:String,
            unique:false,
            required:false
        },
        ImgName:{
            type:String,
            unique:false,
            required:false
        }
    }]
})
module.exports=mongoose.model('userr',userSchema);