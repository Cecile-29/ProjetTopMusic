require('../../app/database_mongo.js');
const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    email : { type: String, unique: true },
    lastname : { type: String},
    firstname : { type: String},
    password : { type: String},
    createdAt: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('user', schema);