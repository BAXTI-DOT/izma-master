import { gql } from 'apollo-server-express'

export default gql`
	type PhoneNumber {
		id: ID!
		phone: String!
	}

	extend type Query {
		studentPhones(studentID: ID!): [PhoneNumber!]!
	}

	extend type Subscription {
		studentPhones(studentID: ID!): [PhoneNumber!]!
	}
`