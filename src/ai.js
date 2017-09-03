import apiai from 'apiai';

export default ({ config }) => {
	var ai = apiai(config.aiAccessToken);
	return ai;
}