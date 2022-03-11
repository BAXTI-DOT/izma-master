import { gql } from 'apollo-server-express'

export default gql`
	type Districts {
		id: ID!
		name: String!
	}

	extend type Query {
		districts(regionID: ID!): [Districts!]!
	}

	extend type Mutation {
		createDistrict(name: String! regionID: ID!): Districts
		updateDistrict(id: ID! name: String!): Districts
		deleteDistrict(id: ID!): Districts
	}

	extend type Subscription {
		districts(regionID: ID!): [Districts!]!
	}
`