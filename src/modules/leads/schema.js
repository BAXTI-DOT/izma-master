import { gql } from 'apollo-server-express'

export default gql`
	type Leads {
		id: ID!
		name: String!
		phoneNumber: String!
		birthday: String!
		gender: Int!
		comment: String!
		course: String!
	}

	extend type Query {
		leads: [Leads!]!
	}

	extend type Mutation {
		newLeadForm(name: String! phoneNumber: String! comment: String! course: ID! hashtag: String!): Leads
		newLeadAdmin(name: String! phoneNumber: String! comment: String!): Leads
		updateLead(name: String! phoneNumber: String! birthday: String! gender: Int! comment: String! course: ID! leadID: ID!): Leads
		deleteLead(leadID: ID!): Leads
	}

	extend type Subscription {
		leads: [Leads!]!
	}
`