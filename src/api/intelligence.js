import resource from 'resource-router-middleware';
import uniqid from 'uniqid';
import ai from '../ai';
import hangouts from '../hangouts';
import sendEmail from '../email-client';

const db = {
	'midhun': 'midhun.darvin@cabotsolutions.com',
	'example': 'cabotdeveloper@cabotsolutions.com'
}
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

		switch (body.result.metadata.intentName) {
			case 'email': {
				response = 'Sending Email';
				sendEmail({
					toMail: db[body.result.parameters.name.toLowerCase()],
					subject: body.result.parameters.subject,
					text: body.result.parameters.content
				}).then((msg) => {
					res.json({ "speech": msg, "displayText": msg });
				});
				break;
			}
			case 'weather': {
				response = 'Fetching weather data';
				res.json({ "speech": response, "displayText": response });
				break;
			}
			default: {
				response = body.result.fulfillment.speech;
				res.json({ "speech": response, "displayText": response });				
				break;
			}
		}

	}

});
