var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
    res.format({
        json: function () {
                res.send(global.sheng_housescores);
              }
    });
});

module.exports = router;
