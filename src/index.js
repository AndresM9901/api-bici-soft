const express = require('express');
const routeUser = require('./controllers/user.controller');
const routeBike = require('./controllers/bike.controller');
const routeEvent = require('./controllers/event.controller');
const logger = require('morgan');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(logger('dev'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/users', routeUser);
app.use('/api/bikes', routeBike);
app.use('/api/bikes', routeEvent);


// app.post('/')

app.listen(process.env.PORT || 3000);