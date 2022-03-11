import { gql } from 'apollo-server-express'

export default gql`
	type Regions {
		id: ID!
		name: String!
	}

	extend type Query {
		regions(countryID: ID!): [Regions!]!
	}

	extend type Mutation {
		createRegion(name: String! countryID: ID!): Regions
		updateRegion(id: ID! name: String!): Regions
		deleteRegion(id: ID!): Regions
	}

	extend type Subscription {
		regions(countryID: ID!): [Regions!]!
	}
`