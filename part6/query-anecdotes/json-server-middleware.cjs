var isAuthenticated = true;

module.exports = function (req, res, next) {
	if (req.method === 'POST' && req.body.content.length<5) {
		res.status(400).json({
			error: "CONTENT_TOO_SHORT"
		 })
	}
	next()
}

function isAuthorized(req) {
	return isAuthenticated;
}