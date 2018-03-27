const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

//get list of ninjas from the db
router.get('/ninjas', function(req, res, next){
    res.send({type:'GET'});
});

//add a new ninja to the db
router.post('/ninjas', function(req, res, next){
    Ninja.create(req.body)
    .then(ninja => {res.send(ninja);})
    .catch(next);
});

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
    res.send({type:'PUT'});
});

// delete a ninja from the database
router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndRemove({_id: req.params.id})
    .then(ninja => res.send(ninja));
    res.send({type:'DELETE'});
});

module.exports = router;