export default ({req, connection}) => {
	if (connection) {
		return connection.context
	}

	return req.headers
}