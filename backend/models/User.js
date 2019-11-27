// Model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    avathar: {
        type: String
    }
},
{
    collation: 'Users' // collection
})

module.exports = mongoose.model('User', userSchema); // model