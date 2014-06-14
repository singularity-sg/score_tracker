var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('scorecard', { 
    title: 'LEARNING QUEST 2014', 
    housescores: global.sheng_housescores    
  });
});

module.exports = router;
