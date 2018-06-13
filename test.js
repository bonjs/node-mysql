var express = require('express');
var db = require('./db');
var router = express.Router();

router.get('/',function(req, res, next){
    db.query("select * from app",function(err,result){
         //console.log(result);
        res.send(JSON.stringify (result));
    });
});
module.exports=router;