var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
    res.redirect('/burgers');
});

router.get('/burgers', function(req, res) {
    db.burger.findAll().then(function(data) {
        var hbsObject = { burgers: data };
        res.render('index', hbsObject);
    });
});

router.post('/burgers/create', function(req, res) {
    db.burger.create({
        burger_name: req.body.b_name,
        devoured: req.body.devoured
    }).then(function() {
        res.redirect('/burgers');
    });
});

router.put('/burgers/update/:id', function(req, res) {

    db.burger.update({
        devoured: 1,
        burger_id: req.params.id
    },
    {
        where: {id : req.params.id}
    }).then(function(data){
        res.redirect('/');
    }).catch(function(err){
        console.log(err);
    });
});

router.delete('/burgers/delete/:id', function(req, res) {
    db.burger.destroy({
        where: { id: req.params.id }
    }).then(function() {
        res.redirect('/burgers');
    });
});

module.exports = router;