import { gql } from 'apollo-server-express'

export default gql`
	type StudyCenters {
		id: ID!
		name: String!
		phoneNumber: String!
	}

	extend type Query {
		studyCenters(regionID: ID!): [StudyCenters!]!
	}

	extend type Mutation {
		createStudyCenter(name: String! phoneNumber: String! regionID: ID!): StudyCenters
		updateStudyCenter(id: ID! name: String! phoneNumber: String!): StudyCenters
		deleteStudyCenter(id: ID!): StudyCenters
	}

	extend type Subscription {
		studyCenters(regionID: ID!): [StudyCenters!]!
	}
`