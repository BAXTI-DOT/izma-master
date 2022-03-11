import { gql } from 'apollo-server-express'

export default gql`
	type StudentAddress {
		id: ID!
		address: String!
	}

	extend type Query {
		studentAddress(studentID: ID!): [StudentAddress!]!
	}

	extend type Subscription {
		studentAddress(studentID: ID!): [StudentAddress!]!
	}
`