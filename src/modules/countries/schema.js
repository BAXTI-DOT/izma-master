import { gql } from 'apollo-server-express'

export default gql`
	type Countries {
		id: ID!
		name: String!
	}

	type Query {
		countries: [Countries!]!
	}

	type Mutation {
		createCountry(name: String!): Countries
		updateCountry(id: ID! name: String!): Countries
		deleteCountry(id: ID!): Countries
	}

	type Subscription {
		countries: [Countries!]!
	}
`