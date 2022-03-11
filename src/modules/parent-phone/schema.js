import { gql } from 'apollo-server-express'

export default gql`
	type ParentNumber {
		id: ID!
		phone: String!
	}

	extend type Query {
		parentPhones(studentID: ID!): [ParentNumber!]!
	}

	extend type Subscription {
		parentPhones(studentID: ID!): [ParentNumber!]!
	}
`