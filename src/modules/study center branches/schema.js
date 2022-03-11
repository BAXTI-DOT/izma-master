import { gql } from 'apollo-server-express'

export default gql`
	type Branches {
		id: ID!
		branchName: String!
		phoneNumber: String!
		hashtag: String!
	}

	extend type Query {
		byCenterID(centerID: ID!): [Branches!]!
		byDistrictID(districtID: ID!): [Branches!]!
	}

	extend type Mutation {
		createBranch(branchName: String! phoneNumber: String! centerID: ID! userName: String! userNumber: String! password: String! hashtag: String! districtID: ID! colleagueStatus: Int!): Branches
		updateBranch(id: ID! branchName: String! phoneNumber: String! password: String! hashtag: String!): Branches
		deleteBranch(id: ID!): Branches
	}

	extend type Subscription {
		byCenterID(centerID: ID!): [Branches!]!
	}
`