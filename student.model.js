const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    department: String
});

module.exports = mongoose.model('students', StudentSchema);