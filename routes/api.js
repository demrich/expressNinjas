const express = require('express');
const router = express.Router();
const Ninja = require('../models/ninja');

router.get('/ninjas', (req, res, next) => {
    //get list of ninjas from the db

   /* Find ALL the ninjas
   Ninja.find({})
    .then(ninjas => {
        res.send(ninjas);
    })
    */

/////////////////////
   /* URL PARAMS
   - Can add parameters in request URL's
   - think ? 
   */
/////////////////////
    Ninja.aggregate([
        {
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
                },
                distanceField: "dist.calculated",
                maxDistance: 100000,
                spherical: true
            }
        }
    ]).then(function(ninjas){
        res.send(ninjas);
    }).catch(next);
});  

//add a new ninja to the db
router.post('/ninjas', function(req, res, next){
    Ninja.create(req.body)
    .then(ninja => {res.send(ninja);})
    .catch(next);
});  

// update a ninja in the db
router.put('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndUpdate({_id: req.params.id},req.body)
    .then(() => {
        Ninja.findOne({_id: req.params.id})
        .then(ninja => res.send(ninja));
        });
});

// delete a ninja from the database
router.delete('/ninjas/:id', function(req, res, next){
    Ninja.findByIdAndRemove({_id: req.params.id})
    .then(ninja => res.send(ninja));
    res.send({type:'DELETE'});
});

module.exports = router;