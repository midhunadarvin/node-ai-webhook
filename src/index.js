import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import uniqid from 'uniqid';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import hangouts from './hangouts';
import ai from './ai';
import config from './config.json';

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit: config.bodyLimit
}));
// connect to db
// initializeDb(db => {
const agent = ai({ config });

// internal middleware
app.use(middleware({ config }));

// api router
app.use('/api', api({ config }));

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

// var request = agent.textRequest(message, {
// 	sessionId: uniqid(config)
// });
// });




export default app;
