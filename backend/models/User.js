// Model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String },
    phone: { type: Number},
    email: { type: String},
    password: { type: String},
    avatar: { type: String },
},
{ collation: 'Users' })  // collection

module.exports = mongoose.model('User', userSchema); // model
