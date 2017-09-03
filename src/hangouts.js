import Client from 'hangupsjs';
import hangoutsBot from 'hangouts-bot';
import prompt from 'prompt';
import readlineSync from 'readline-sync';
import Q from 'q';

export default () => {
	var deferred = Q.defer();

	
	// var username = readlineSync.question('Enter your username : ');
	// var password = readlineSync.question('Enter your password : ', {
	// 	hideEchoBack: true // The typed text on screen is hidden by `*` (default). 
	// });
	var username = 'cabotdeveloper@gmail.com';
	var password = 'cabot1234';
	var bot = new hangoutsBot(username, password);
	// var bot = new hangoutsBot("cabotdeveloper@gmail.com", "cabot1234");
	deferred.resolve(bot);
	// prompt.get(['username', 'password'], (err, result) => {
	// 	console.log(result);
	// 	var bot = new hangoutsBot(result.username, result.password);
	// 	deferred.resolve(bot);
	// });

	// var bot = new hangoutsBot('cabotdeveloper@gmail.com', 'cabot1234');
	// deferred.resolve(bot);


	return deferred.promise;
}