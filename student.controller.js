const Student = require('./student.model.js');

exports.create = (req, res) => {
    const student = new Student({
        id: req.body.id, 
        name: req.body.name,
        age: req.body.age,
        department: req.body.department
    });
    student.save()
    res.send(student);
};

exports.findAll = (req, res) => {
    Student.find()
    .then(students => {
        res.send(students);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

exports.findOne = (req, res) => {
    Student.findById(req.params.id)
    .then(student => {
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });                
        }
    });
};

exports.update = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Student content can not be empty"
        });
    }
    
    Student.findByIdAndUpdate(req.params.id, {
        id: req.body.id, 
        name: req.body.name,
        age: req.body.age,
        department: req.body.department
    }, {new: true})
    .then(student => {
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });                
        }
    });
};

exports.delete = (req, res) => {
    Student.findByIdAndRemove(req.params.id)
    .then(student => {
        res.send({message: "Student deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Student not found with id " + req.params.id
            });                
        }
    });
};

