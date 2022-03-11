import { gql } from 'apollo-server-express'

export default gql`
	type SubCourse {
		id: ID!
		name: String!
		price: String!
		description: String!
	}

	extend type Query {
		subCourses(courseID: ID!): [SubCourse!]!
	}

	extend type Mutation {
		createSubcourse(name: String! price: String! description: String! courseID: ID!): SubCourse
		updateSubCourse(name: String! price: String! description: String! courseID: ID!): SubCourse
		deleteSubCourse(id: ID!): SubCourse
	}

	extend type Subscription {
		subCourses(countryID: ID!): [SubCourse!]!
	}
`