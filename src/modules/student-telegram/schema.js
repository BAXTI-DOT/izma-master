import { gql } from 'apollo-server-express'

export default gql`
	type StudentTelegram {
		id: ID!
		telegram: String!
	}

	extend type Query {
		studentTelegram(studentID: ID!): [StudentTelegram!]!
	}

	extend type Subscription {
		studentTelegram(studentID: ID!): [StudentTelegram!]!
	}
`