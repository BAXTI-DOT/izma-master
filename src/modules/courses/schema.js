import { gql } from 'apollo-server-express'

export default gql`
	type Courses {
		id: ID!
		name: String!
		price: String!
		description: String!
		onlineLessons: [OnlineLessons]
		subCourses: [SubCourse]
		groups: [ Groups ]
	}

	extend type Query {
		byHashtag(hashtag: String!): [Courses!]!
		byCourseID(courseID: ID!): [Courses!]!
		courses: [Courses!]!
	}

	extend type Mutation {
		createCourse(name: String! price: String! description: String subcourseID: ID): Courses
		updateCourse(id: ID! name: String! price: String! description: String): Courses
		deleteCourse(id: ID!): Courses
	}

	extend type Subscription {
		byHashtag(hashtag: String!): [Courses!]!
		courses: [Courses!]!
	}
`