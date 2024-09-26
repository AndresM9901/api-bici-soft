const express = require('express');
const cors = require('cors');
const routeUser = require('./controllers/user.controller');
const routeBike = require('./controllers/bike.controller');
const routeEvent = require('./controllers/event.controller');
const routeRent = require('./controllers/rent.controller');
const routeCenter = require('./controllers/training-center.controller');
const logger = require('morgan');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(logger('dev'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api/users', routeUser);
app.use('/api/bikes', routeBike);
app.use('/api/events', routeEvent);
app.use('/api/rentals', routeRent);
app.use('/api/centers', routeCenter);


// app.post('/')

app.listen(process.env.PORT || 3000);