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
        // const fileName = file.originalname.toLocaleLowerCase().split(' ').join('-');
        const fileName = file;
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
        if(file.mimetype == ('image/png')) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png allowed'))
        }
    }
});

let User = require("../models/User"); // importing DB model

// POST User
router.post('/create-user', upload.single('avatar'),(req, res, next) => { // posting the data with file 

    const url = req.protocol + '://' + req.get('host'); // get url

    const user = new User({ // model initialized
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        avatar: url+'/public/'+req.file.filename
    });

    user.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'User registered successfully',
            userCreated: {
                _id: result._id,
                name: result.name,
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

module.exports = router;
