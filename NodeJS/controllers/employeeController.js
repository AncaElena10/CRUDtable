// implement router from express

const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;
var passport = require('passport');

var { Employee } = require('../models/employee');

// => localhost:3000/employees/
router.get('/', (req, res) => {
  // console.log("HERE");
  Employee.find((err, docs) => {
    // if (isValidUser) {
    if (!err) {
      // if no err, return documents from employees collection
      res.send(docs);
      // }
    } else {
      console.log('Error in retriving employees: ' + JSON.stringify(err, undefined, 2));
    }
  });
});

// cautare dupa id
// => localhost:3000/employees/5b506dbde0e07d1a60e5dc5f
router.get('/:id', (req, res) => {
  // console.log("ajsd")
  // check if _id is valid on mongodb
  // daca _id nu exista
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  }
  // daca _id exista
  // if (isValidUser) {
  Employee.findById(req.params.id, (err, docs) => {
    if (!err) {
      console.log(docs)
      res.send(docs);
    } else {
      console.log('Error in retriving employees: ' + JSON.stringify(err, undefined, 2));
    }
  });
  // }
});

// insert new employee record into collection
// => localhost:3000/employees/
// nu se poate face din browser precum get -> se foloseste POSTMAN
router.post('/', (req, res) => {
  var emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  });
  emp.save((err, doc) => {
    if (!err) {
      res.send(doc);
    }
    else {
      console.log('Error in Employee Save :' + JSON.stringify(err, undefined, 2));
    }
  });
});

router.put('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  }
  // un obiect normal, nu de tip Employee
  var emp = {
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
  };
  Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in employee update: ' + JSON.stringify(err, undefined, 2));
    }
  });
})

router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id: ${req.params.id}`);
  }
  Employee.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('Error in employee delete: ' + JSON.stringify(err, undefined, 2));
    }
  });
});

// function isValidUser(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     return res.status(401).json({ message: 'Unauthorized Request' });
//   }
// }

// function isLoggedIn(req, res, next) {

//   // if user is authenticated in the session, carry on 
//   if (req.isAuthenticated())
//       return next();

//   // if they aren't redirect them to the home page
//   res.redirect('/');
// }

module.exports = router;