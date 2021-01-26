let router = require("express").Router(); //here
let User = require("../db").import("../models/user"); //here
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/create", (req, res) => {
  User.create({
    email: req.body.user.email,
    password: bcrypt.hashSync(req.body.user.password, 13)
  })
    .then((user) => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      })
      res.status(200).json({
        user: user,
        message: "User succesfully created!",
        sessionToken: token,
      });
    })
    .catch((err) => res.status(500).json({ error: err }));
});

router.post('/login', function (req, res) {
  User.findOne({
    where: {
      email: req.body.user.email
    }
  }).then(function loginSuccess(user) {
    if (user) {
      bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
        if (matches) {
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 })

          res.status(200).json({
            user: user,
            message: "User successfuly logged in!",
            sessionToken: token
          })

        } else {
          res.status(502).send({ error: "Login Failed" });
        }
      });
    } else {
      res.status(500).json({ error: 'User does not exist.' })
    }
  })
    .catch(err => res.status(500).json({ error: err}))
});

module.exports = router;



// const sequelize = require('../db');
// const router = require('express').Router();
// const User = require("../db").import("../models/user.js");
// const jwt = require("jsonwebtoken");
// const bcrypt = require('bcryptjs');

// router.post('/create', function(req,res){
//     let userModel = {
//         email: req.body.user.email,
//         password: bcrypt.hashSync(req.body.user.password, 13)
//     };
//     User.create(userModel).then(function (user){
//         let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
//         let responseObject = {
//             user: user,
//             message: "User successfully created",
//             // sessionToken: token
//         };
//         res.json(responseObject);
//     })
//     .catch(function(err){
//         res.status(500).json({error: err})
//     });
// });
