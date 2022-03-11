import { gql } from 'apollo-server-express'

export default gql`
	type Colleagues {
		id: ID!
		name: String!
		phoneNumber: String!
		password: String!
		gender: String!
		comment: String
		photo: Data
		status: String
	}

	extend type Query {
		colleagues: [Colleagues!]!
	}

	extend type Mutation {
		createColleague(name: String! phoneNumber: String! birthday: String! gender: Int! password: String! comment: String photo: Data status: Int!): Colleagues
		updateColleague(id: ID! name: String! phoneNumber: String! gender: String! password: String! comment: String  photo: Data): Colleagues
		deleteColleague(id: ID!): Colleagues
	}

	extend type Subscription {
		colleagues: [Colleagues!]!
	}
`