var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var dbURI = 'mongodb://MacBook-Pro.local/employeedirectory';
var dbURI = 'mongodb://vinothpandiyan:vinothpandiyan@ds121906.mlab.com:21906/employeedirectory';

mongoose.connect(dbURI);

// Schema Definitions
var employeeSchema = new Schema({
    name: String,
    email: String,
    dob: {type: String},
    department: String,
    gender: String
}, {collection: 'employee'});

// register Model
mongoose.model('employeeModel', employeeSchema);