import { gql } from 'apollo-server-express'

export default gql`
	extend type Mutation {
		login(phoneNumber: String! password: String! hashtag: String!): Data
	}
`