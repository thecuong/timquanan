var User = require('./model/user.js')
var Poster = require('./model/poster.js')
var Contribute = require('./model/contribute.js')
var fileSystem = require('fs');


module.exports = function (app) {
  app.get('/', function (req, res) {
    console.log(__dirname)
    res.sendFile( __dirname + "/src/" + "admin.html" );
 })
 
//sua cua hang
 app.get('/editStore', function(req, res) {
  res.render('pages/editStore.ejs');
});
app.post('/editStore',function(req,res){
  console.log(req.body.poster)
    var body=req.body.poster;
    Poster.findByIdAndUpdate(body.IDStore, { $set: {
       urlImage: body.Urlstore,
       ImgName:body.NameStore,
       address:body.AddrStore,
       kinhdo:body.AddrKD,
        vido:body.AddrVD,
       contents:body.ConStore }},
        { new: true }, function (err, tank) {
      if (err) return handleError(err)
      res.send(tank)
    });
})

//them cua hang
app.get('/addStore', function(req, res) {
  res.render('pages/addStore.ejs');
});
app.post('/addStore',function(req,res){
  console.log(req.body.poster)
    var body=req.body.poster;
   var Post = new Poster({
    addminCheck:"Yes",
    urlImage: body.Urlstore,
    ImgName:body.NameStore,
    address:body.AddrStore,
    kinhdo:body.AddrKD,
    vido:body.AddrVD,
    contents:body.ConStore
   })
   Post.save(function (err, results) {
    console.log(results);
  res.json({results}) })
});
//xoa cua hang
app.get('/removeStore',function(req, res) {
  res.render('pages/removeStore.ejs'); 
})

app.post('/removeStore', function(req,res){
  console.log(req.body.poster)
    var body=req.body.poster;

    Poster.deleteOne({_id: body.IDStore}, function (err,res) {
      if (err) throw err;
      console.log('delete success: record');
      
  });
  res.send("OK");
})

//add Food
app.get('/addFood',function(req, res) {
  res.render('pages/addMenu.ejs'); 
})
app.post('/addMenu',function(req,res){
  console.log(req.body.poster)
  var body = req.body.poster;

  var MoreConTen = { "ImgFood" : body.Urlstore,
  "ImgNameFood": body.NameFood,
  "Price":body.Price}
  Poster.findOneAndUpdate( {_id: body.IDStore},
    {$push:
      { 
    MoreContents: MoreConTen
      }
    },
  {safe: true, upsert: true},
  function(err, doc) {
    res.json(doc)
  })
})

//delete menu
app.get('/removeFood',function(req,res){
  res.render('pages/deleteMenu.ejs')
})
app.post('/deleteMenu',function(req,res){
  console.log(req.body.poster)
  var body = req.body.poster

  Poster.update({_id: body.IDStore},
    {$pull:{
    MoreContents: {
      _id: body.IDMenu
    }
  }},{ multi: true }
  ,function(err,model) {
    if(err){
       console.log(err);
       return res.send(err);
     }
     return res.json(model);
    }
  )

})

//edit Menu
app.get('/editFood',function(req,res){
  res.render('pages/editMenu.ejs')
})
app.post('/editMenu',function(req,res){
  console.log(req.body.poster)
  var body = req.body.poster
var asdasd = body.UrlFood
  // var updates = {"MoreContents.$.ImgFood": body.UrlFood,
  // "MoreContents.$.ImgNameFood": body.NameFood,
  // "MoreContents.$.Price":body.Price}
  Poster.updateOne({_id: body.IDStore, "MoreContents._id": body.IDMenu},
  {
    $set:{
      
      "MoreContents.$.ImgFood": body.UrlFood,
      "MoreContents.$.ImgNameFood": body.NameFood,
      "MoreContents.$.Price":body.Price 
    }
  },
  function(err,model) {
    if(err){
       console.log(err);
       return res.send(err);
     }
     return res.json(model);
    }
  )//end Poster 
})
  // app.post("/edit_admin", function (req, res) {
  //   console.log(req.body.user)
  //   var body=req.body.user;
  //   User.findByIdAndUpdate(body.iduser, { $set: { urlimages: body.file,imagesname:body.namefood,address:body.addressfood,contents:body.contents }}, { new: true }, function (err, tank) {
  //     if (err) return handleError(err);
  //     res.send(tank);
  //   });
  // })

//read
app.get('/read',function(req,res){
var query = Poster.find({'addminCheck':'Yes'});
query.sort({ _id: -1 });

// thực thi câu truy vấn
query.exec(function (err, athletes) {
  if (err) return handleError(err);
  res.json({"result": athletes})
})

})
// find
app.post('/find',function(req,res){
  console.log(req.body.poster)
  var body = req.body.poster

  var find = Poster.findOne({_id: req.body.idfind})
  find.exec(function(err, athletes) {
    if (err) {
      return handleError(err)
    }
    res.json({"result": athletes})
  })

  
})
//demo
app.get('/aaa',function(req,res){
  res.send("asdas")
})
// xu ly user
app.get('/readUser',function(req,res){
  User.find({}, function (err, users) {
    res.json({"result": users});
  })
});


app.post('/addUsers',function(req,res){
  console.log(req.body.userr)
    var body=req.body.userr;
    const{uid,name,imgprofile} = req.body
   User.create({ 
     uid,name,imgprofile
  },{unique: false, sparse: true},function (err, results) {
    console.log(err);
    console.log(results);
  res.json({results}) })
});
app.post('/addSaveUsers',function(req, res){
  console.log(req.body.userr)
  var body = req.body.userr;
const {IDStore,iduser,NameStore} = req.body
  var MoreConTen = { 
  "idStore" : IDStore,
  "ImgName": NameStore
}

  User.findOneAndUpdate( {"uid": iduser},
    {$push:
      { 
        SaveStore: MoreConTen
      }
    },{upsert: true},
  function(err, doc) {
    console.log(err)
    res.json(doc)
  })
})
//delete save
app.post('/deleteSave',function(req,res){
  console.log(req.body.userr)
  var body = req.body.userr
  User.update({uid: req.body.uid},
    {$pull:{
      SaveStore: {
        idStore: req.body.idStore
      }
  }},{ multi: true }
  ,function(err,model) {
    if(err){
       console.log(err);
       return res.send(err);
     }
     return res.json(model);
    }
  )
})
app.post('/removeUser', function(req,res){
  console.log(req.body.userr)
    var body=req.body.userr;

    User.deleteOne({_id: req.body.iduser}, function (err,res) {
      if (err) throw err;
      console.log('delete success: record');
      
  });
  res.send("OK");
})
app.post('/findUser',function(req,res){
  console.log(req.body.userr)
  var body = req.body.userr
//req.body.uidfind
  User.findOne({uid: req.body.uidfind},function(error, user){
    res.json({"result": user});
  })

  
})
//Adventure.findOne({ type: 'iphone' }, function (err, adventure) {});
app.post('/check',function(req,res){
  console.log(req.body.userr)
  var body = req.body.userr

  User.findOne({uid: req.body.uidUser,"SaveStore.idStore": req.body.idSave},function(error,user){
    
      if(user != null)
      {
        res.json(1)
      }
      else{
        res.json(0)
      }
  })
})
//add comment
app.post('/addComment',function(req,res){
  console.log(req.body.poster)
  var body = req.body.poster;

  const{idupdata,uid,content,name,imgprofile} = req.body
  

var comment2 = { "uid" : uid,
  "content": content,
  "name": name,
  "imgprofile" : imgprofile
}
  Poster.findOneAndUpdate( {_id: idupdata},
    {$push:
      { 
        Comments: comment2
      }
    },
  {safe: true, upsert: true},
  function(err, doc) {
    res.json(doc)
  })
})

app.post('/editComment',function(req,res) {
  console.log(req.body.poster)
  var body = req.body.poster
  // const {idstore,uid,comment} = req.body
  Poster.updateOne({_id: req.body.idstore, "Comments.uid": req.body.uid}, {
    $set: {
      "Comments.$.content" : req.body.cmt
    }
  }, function(err,model) {
  if (err) {
    console.log(err)
    return res.send(err)
  }
  return res.json(model)
  })
})

app.post('/deleteComment', function(req,res) {
  console.log(req.body.poster)
  var body = req.body.poster

  Poster.update({_id: req.body.IDStore}, {
    $pull: {
      Comments: {
        _id: req.body.idCmt
      }
    }
    }, {multi: true}, function(err,model) {
      if (err) {
        console.log(err)
        return res.send(err)
      }
      return res.json(model)
    })
})
//user read store
app.post('/userReadStore',function(req,res){
  console.log(req.body.poster)
  var body = req.body.poster
Poster.find({uID: req.body.userID},function(error, user){
    res.json({"result": user});
  })

  
})
//user add store
app.post('/useAddStore',function(req,res){
  console.log(req.body.poster)
    var body = req.body;
    var Post = new Poster(body)
   Post.save(function (err, results) {
    console.log(results);
  res.json({results}) })
});
//updata store user
app.post('/userUpdateStore',function(req,res){
  console.log(req.body.poster)
  var body = req.body;
  const{idupdata} = req.body
  Poster.findByIdAndUpdate(idupdata , body,
     { new: true }, function (err, tank) {
   if (err) return handleError(err)
   res.send(tank)
 });
})
//user read my Store
app.post('/userReadShareStore',function(req,res){
  console.log(req.body.poster)
  var body = req.body;
  var query = Poster.find({'uID':req.body.uID});
  query.sort({ _id: -1 });
  
  // thực thi câu truy vấn
  query.exec(function (err, athletes) {
    if (err) return handleError(err);
    res.json({"result": athletes})
  })
  
  })
//get web
  app.get("/UserShare", (req, res)=>{
    Poster.find({'addminCheck':'No'}, (err, blogs)=>{
      if(err){
        console.log("Error!");
        console.log(err);
      } else {
          res.render("pages/UserShareStore", {blogs: blogs});
      }
    });
  });
  app.post('/AddminUpdatePostUser',function(req,res){
    console.log(req.body.poster)
    var body = req.body.poster;
    var update = { "vido": body.vido,
    "kinhdo":body.kinhdo,
    "addminCheck":"Yes"}
    Poster.findByIdAndUpdate(body.id , update,
       { new: true }, function (err, tank) {
     if (err) return handleError(err)
     res.send(tank)
   });
  })
// user remove store
app.post('/userRemoveStore', function(req,res){
  console.log(req.body.poster)
    var body=req.body.poster;
  
    Poster.deleteOne({_id: req.body.IDStore}, function (err,res) {
      if (err) throw err;
      console.log('delete success: record'); 
  });
  res.json(OK);
})

}//end modul