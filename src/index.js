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
hangouts().then((bot) => {
	const agent = ai({ config });

	bot.on('online', () => {
		console.log('online');

		// internal middleware
		app.use(middleware({ config }));

		// api router
		app.use('/api', api({ config, bot }));

		app.server.listen(process.env.PORT || config.port, () => {
			console.log(`Started on port ${app.server.address().port}`);
		});
	});

	bot.on('message', (from, message) => {
		console.log(from + ">> " + message);

		var request = agent.textRequest(message, {
			sessionId: uniqid(config)
		});

		request.on('response', function (response) {
			// console.log(response);
			bot.sendMessage(from, response.result.fulfillment.speech);
			// res.json({
			// 	'result': response.result.fulfillment.speech
			// });
		});

		request.on('error', function (error) {
			console.log(error);
		});

		request.end();

		// switch (message) {
		// 	case "help":
		// 		bot.sendMessage(from, "I an example Hangouts bot. Try saying hello.");
		// 		break;
		// 	case "hello":
		// 		bot.sendMessage(from, "Why hello to you too.");
		// 		break;
		// }
	});

});
// });




export default app;
