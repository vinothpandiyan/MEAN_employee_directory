// Express app init
var express = require('express');
var bodyparser = require('body-parser');
var app = express();

app.use(express.static(__dirname + "/public"));

// Body Parser
app.use(bodyparser.json());
app.use(bodyparser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyparser.urlencoded({extended:false}));

// DB Definitions and Models
var db = require('./model/db.js');
var mongoose = require('mongoose');
var EmployeeModel = mongoose.model('employeeModel');


app.get('/employeelist', function(req, res){
    EmployeeModel.find({}, function(err, EmployeeList){
        if(!err){
            res.json(EmployeeList);
        }
    });
});

app.post('/addemployee', function(req, res){
    var newEmployee = new EmployeeModel();
    newEmployee.name = req.body.name;
    newEmployee.email = req.body.email;
    newEmployee.department = req.body.department;
    newEmployee.dob = req.body.dob;
    newEmployee.gender = req.body.gender;
    newEmployee.save(function(err, savedEmployee){
        if(!err){
            res.json(true);
        } else {
            res.json(false);
        }
    });
});

app.delete('/removeemployee/:id', function(req, res){
    var employeeId = req.params.id;
    EmployeeModel.remove({_id: employeeId}, function(err){
        if(err){
            res.json("Error removing "+employeeId);
        } else {
            res.json(employeeId + ' removed successfully !!');
        }
    });
});

// Edit employee
app.get('/employee/:id', function(req, res){
    var employeeId = req.params.id;
    EmployeeModel.findOne({_id: employeeId}, function(err, employee){
        if(!err){
            res.json(employee);
        }
    });
});

// Update Employee
app.post('/updateemployee/:id', function(req, res){
    var employeeId = req.body._id;
    EmployeeModel.update({_id: employeeId},{
        name: req.body.name,
        email: req.body.email,
        dob: req.body.dob,
        department: req.body.department,
        gender: req.body.gender
    }, {multi:false}, function(err, uddatedRec){
        if(!err){
            res.json(true);
        } else {
            res.json(false);
        }
    });
});

// Port mapping
var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log("Server running @ port "+port);
});
