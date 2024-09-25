const mongoose = require('mongoose');
require('dotenv').config();

const URI = `mongodb+srv://${process.env.USERDB}:${process.env.PASSDB}@adso2669736.kkecyyy.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
mongoose.connect(URI);

module.exports = mongoose;