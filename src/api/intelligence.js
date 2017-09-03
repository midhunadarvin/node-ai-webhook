import resource from 'resource-router-middleware';
import uniqid from 'uniqid';
import ai from '../ai';
import hangouts from '../hangouts';

export default ({ config, bot }) => resource({

	/** POST / - Default entity */
	create({ body }, res) {
		
		res.json({
			'result': 'hello'
		});
		
	}

});
