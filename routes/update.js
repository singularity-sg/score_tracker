var express = require('express');
var router = express.Router();

/* POST results. */
router.post('/', function(req, res) {
    console.info("House : " + req.body.house);
    console.info("Operator : " + req.body.operator);
    var operator = req.body.operator;
    var housename = req.body.house;
    var house_found = false; 
    var housescores = global.sheng_housescores; 
    for (var i in housescores) {
        house = housescores[i];
        if (house.name == housename) {
            house_found = true;
            if (operator == '+') {
                if(house.score < global.maxScore) {
                    house.score += 10;
                    console.log("Adding 10 to " + house);
                } else {
                    res.json(400, { 'status':'Unable to increment as the score is already' + global.maxScore });
                }
            } else 
            if (operator == '-') {
                if(house.score > 0) {
                    house.score -= 10;
                    console.log("Minus 10 to " + house);
                } else {
                    res.json(400, { 'status':'Unable to decrement as it is already 0' });
                }

            } else {
                console.error("Unable to determine operator");
                res.json(400, { 'status':'Unknown operator:' + operator});
                return;
            }

            break;
        }
    }
    
    if (house_found) {
        res.json(200, {'status':'ok'});
    } else {
        res.json(400, {'status':'Unknown house:' + housename});
    };
});

router.get('/', function(req, res) {
    console.log("Unused path for /update not used");
    res.json(404, { 'status':'Unused path'});
});

module.exports = router;
