export default {
	GET: (req, res) => {
		try {
			res.send('Hello world...')
		}
		catch(error) {
			res.status(400).send(error)
		}
		finally {
			res.end()
		}
	},
}