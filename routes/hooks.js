var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req);
  fs.writeFile("./serv_files/maxim.json", JSON.stringify(req.query), function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
});

router.post('/', function(req, res){
  //fs.writeFile("./serv_files/hooks.json", JSON.stringify(req), function(err) {
  //  if(err) {
  //    return console.log(err);
  //  }
  //  console.log("The file was saved!");
  //});
  //res.send('POST request to the homeserv');
  console.log(req);
});

module.exports = router;

