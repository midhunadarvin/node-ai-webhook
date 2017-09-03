import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import intelligence from './intelligence'

export default ({ config, db, bot }) => {
	let api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	api.use('/ai', intelligence({ config, bot }))

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}