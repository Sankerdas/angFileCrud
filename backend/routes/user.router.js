//  REST APIs routes

let express = require('express'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    router = express.Router();

// multer file upload path
const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
})

// multer mime type validator
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5,
    },
    fileFilter:(req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png allowed'))
        }
    }
});

let User = require("../models/User"); // importing DB model

// Add User (POST)
router.post('/create-user', upload.single('avatar'),(req, res, next) => { // posting the data with file

    const url = req.protocol + '://' + req.get('host'); // get url

    const user = new User({ // model initialized
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        avatar: url+'/public/'+req.file.filename
    });

    user.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'User registered successfully',
            userCreated: {
                _id: result._id,
                name: result.name,
                phone: result.phone,
                email: result.email,
                password: result.password,
                avatar: result.avatar
            }
        })
    }).catch(err => {
        console.log(err),
        res.status(500).json({
            error: err
        })
    })
});

// Get Users
router.get('/',(req, res, next) => {
    User.find().then(data => {
        res.status(200).json({
            message: 'Data retrived successfully ! ',
            users: data
        });
    });
});

// Edit User
router.get('/edit-user/:id', (req, res, next) => {
    User.findById(req.params.id, (err, user) => {
        if(err) console.log('error in edit' + err)
        else res.json(user)
    });
})


// Update User
router.post('/update-user/:id', upload.single('avatar'),(req, res, next) => {

    User.findById(req.params.id, (err, user) => {
        if(!user){
            res.json('Could not load documet');
        } else {
            if(req.body.avatar || req.file.filename === null) {
                user.name = req.body.name,
                user.phone =  req.body.phone,
                user.email = req.body.email,
                user.password = req.body.password,
                user.save().then(user => {
                    res.json('success');
                }).catch(err => {
                    res.status(400).send(err);
                })
            } else {
                const url = req.protocol + '://' + req.get('host'); // get url
                user.name = req.body.name,
                user.phone =  req.body.phone,
                user.email = req.body.email,
                user.password = req.body.password,
                user.avatar = url+'/public/'+req.file.filename
                user.save().then(user => {
                    res.json('User and profile image updated..!')
                }).catch(err => {
                    res.status(400).send(err);
                })
            }
        }
    })
})


// Delete User
router.get('/delete-user/:id', (req, res, next) => {
    User.findByIdAndRemove({_id: req.params.id}, function (err, user) {
        if(err) res.json(err)
        else res.json('User Removed successfully !');
    });
});

module.exports = router;
