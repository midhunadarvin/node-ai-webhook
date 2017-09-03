import resource from 'resource-router-middleware';
import uniqid from 'uniqid';
import ai from '../ai';
import hangouts from '../hangouts';

export default ({ config }) => resource({

	/** GET / - List all entities */
	index({ body }, res) {
		res.json(body);
	},
	/** POST / - Default entity */
	create({ body }, res) {
		
		res.json({
			'result': 'hello'
		});
		
	}

});
