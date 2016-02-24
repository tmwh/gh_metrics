var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  console.log(req);
  fs.writeFile("./tmp/maxim.json", JSON.stringify(req.query), function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });
});

router.post('/', function(req, res, next){
  fs.writeFile("./tmp/hooks.json", JSON.stringify(req), function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});

module.exports = router;

