import { gql } from 'apollo-server-express'

export default gql`
	type OnlineLessons {
		id: ID!
		title: String!
	}

	extend type Query {
		onlineLessons(courseID: ID!): [OnlineLessons!]!
	}

	extend type Mutation {
		createOnlineLesson(title: String! courseID: ID!): OnlineLessons
		updateOnlineLesson(title: String! lessonID: ID!): OnlineLessons
		deleteOnlineLesson(lessonID: ID!): OnlineLessons
	}

	extend type Subscription {
		onlineLessons(courseID: ID!): [OnlineLessons!]!
	}
`