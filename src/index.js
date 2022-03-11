import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import cors from 'cors'
import http from 'http'
import modules from '@modules/module'
import routes from '@express/routes'
import context from './apollo-context'

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

const PORT = process.env.PORT || 5000
const server = new ApolloServer({
	modules,
	context: ({ req, connection }) => {
		if (connection) {
	      // check connection for metadata
	      	return connection.context;
	    } 
	    else {
	      // check from req
	      const authorization = req.headers.authorization || "";

	      return { authorization }
	    }

	},
	subscriptions: {
		onConnect: (connectionParams, webSocket, context) => {
			if (connectionParams) {
				return {
					authorization: connectionParams.authorization
				}
			}
		},
		onDisconnect: (webSocket, context) => {},
	},
	introspection: true,
    playground: true,
})

server.applyMiddleware({ app })

const httpServer = http.createServer(app)

server.installSubscriptionHandlers(httpServer)
 
httpServer.listen({ port: PORT }, () => {
	console.log(`http://localhost:${PORT}` + server.graphqlPath)
  	console.log(`ws://localhost:${PORT}` + server.subscriptionsPath)
})