import { gql } from 'apollo-server-express'

export default gql`
	type Cash {
		id: ID
		type: String
		amount: String
		comment: String
	}

	extend type Query {
		studentCash(studentID: ID!): [Cash!]!
	}

	extend type Mutation {
		newCash(studentID: ID! type: String! amount: String! comment: String!): Cash
	}

	extend type Subscription {
		studentCash: [Cash!]!
	}
`