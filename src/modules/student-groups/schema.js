import { gql } from 'apollo-server-express'

export default gql`
	extend type Query {
		studentGroups(studentID: ID!): [Groups!]!
	}

	extend type Subscription {
		studentGroups(studentID: ID!): [Groups!]!
	}
`