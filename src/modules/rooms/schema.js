import { gql } from 'apollo-server-express'

export default gql`
	type Rooms {
		id: ID!
		room: String!
	}

	extend type Query {
		rooms: [Rooms!]!
	}

	extend type Mutation {
		createRoom(name: String!): Rooms
		updateRoom(name: String!): Rooms
		deleteRoom(id: ID!): Rooms
	}

	extend type Subscription {
		rooms: [Rooms!]!
	}
`