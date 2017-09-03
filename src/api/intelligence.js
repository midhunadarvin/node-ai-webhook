import resource from 'resource-router-middleware';
import uniqid from 'uniqid';
import ai from '../ai';
import hangouts from '../hangouts';

export default ({ config }) => resource({

	/** GET / - List all entities */
	index({ body }, res) {
		res.json({
			'result': 'hello'
		});
	},
	/** POST / - Default entity */
	create({ body }, res) {
		var response;

		switch(body.result.metadata.intentName) {
			case 'email': {
				response = 'Sending Email';
				break;
			}
			case 'weather': {
				response = 'Fetching weather data';
				break;
			}
			default : {
				response = body.result.fulfillment.speech;
				break;
			}
		}
		res.json({ "speech": response, "displayText": response });

	}

});
