//File for handling all routes of '/leaders' endpoint
//This is an mini express router, so we require all that was required in index.js

const express = require('express');
const bodyParser  = require('body-parser');

//Import leaders model and store it in a variable
const Leaders = require('../models/leaders');

//Declare leaderRouter as express router
const leaderRouter = express.Router();

//Make use of body parser
leaderRouter.use(bodyParser.json());

//The endpoint is just / since this router will be mounted as /leaders in index.js

leaderRouter.route('/')
    .get((req, res, next) => {
        Leaders.find()
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                //Return the response as json
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Leaders.create(req.body)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                //Return the response as json
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403
        res.end('PUT operation forbidden on /leaders');
    })
    .delete((req, res, next) => {
        Leaders.remove()
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                //Return the response as json
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


//ROUTE FOR /leaders/:leaderId
leaderRouter.route('/:leaderId')
    .get((req, res, next) => {
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                //Return the response as json
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403
        res.end('POST operation forbidden on /leaders/' + req.params.leaderId);
    })
    .put((req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, { $set : req.body }, { new : true })
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                //Return the response as json
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Leaders.findByIdAndRemove(req.params.leaderId)
            .then((response) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                //Return the response as json
                res.json(response);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//Export this route as a module
module.exports = leaderRouter;