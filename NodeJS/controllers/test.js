const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

// localhost:3000/bla/...
// router.get('/:pagename', (req, res) => {
//   Employee.find((err, docs) => {
//       if (!err) {
//           // if no err, return documents from employees collection
//           res.send(docs);
//           // res.render('')
//       } else {
//           console.log('Error in retriving employees: ' + JSON.stringify(err, undefined, 2));
//       }
//   });
// });

router.get('/:pagename', (req, res) => {
  res.send("HELLO");}
);

module.exports = router;