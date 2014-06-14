var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { 
    title: 'LEARNING QUEST 2014', 
    housenames: global.sheng_housenames,
    housescores: global.sheng_housescores    
  });
});

module.exports = router;
