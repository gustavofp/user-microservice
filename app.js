import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import http from 'http';

import * as database from './config/database.config';
import * as user from './controller/user.controller';

// initialize server

const app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));
app.use(bodyParser.json());


// routes
app.post('/user', (req, res) => {
    user.save(req, res);
})

app.post('/login', (req, res) => {
    user.login(req, res);
})

database.connection()
.then(() => {
    app.server.listen(process.env.PORT || 8080, () => {
        console.log(`Started on port ${app.server.address().port}`);
    });
})
.catch(err => console.log(`Failed to connect to database ${err}`))
