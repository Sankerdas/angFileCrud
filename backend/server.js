let express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyparser = require('body-parser'),
    dbConfig = require('./database/db'); // getting db

    // router to haddle request
    const userRoute = require('./routes/user.router');


// Mongoose setup
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true
}).then(() => {
    console.log('Mongo DB connected successfully');
},
    error => {
        console.log('Database could not connceted: ' + error );
    }
);

// Setup express.js
const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    exteded: false
}));
app.use(cors());


app.use('/public', express.static('public')); // Make "public" folder publically available
app.use('/api', userRoute); // API Router
app.get('/favicon.ico', (req, res) => res.status(204));// Error favicon.ico

port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('connecte to port '+ port)
});

// Error
app.use((req, res, next) => {
    setImmediate(() => {
        next(new Error('Something went wrong') )
    });
})

app.use(function(err, req, req, next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(statusCode).send(err.message);
});