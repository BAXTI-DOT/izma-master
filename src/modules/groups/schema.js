import { gql } from 'apollo-server-express'

export default gql`
	type Groups {
		id: ID!
		name: String!
		teacher: String!
		days: String!
		rooms: String!
		time: String!
		startDate: String!
		endDate: String!
		studentsCount: Int! 
		price: String
		courseName: String
		onlineLessons: [ OnlineLessons ]
		students: [ Students ]
	}

	input TeacherInput {
		teacherID: ID!
	}

	input CourseInput {
		courseID: ID!
	}

	extend type Query {
		groups(teacherID: [ID!]! courseID: [ID!]!): [Groups!]!
		byGroupID(groupID: ID!): [Groups]
	}

	extend type Mutation {
		createGroup(name: String! courseID: ID! teacherID: ID! days: String! roomID: ID! time: String! startDate: String! endDate: String!): Groups
		updateGroup(groupID: ID! name: String! courseID: ID! teacherID: ID! days: String! roomID: ID! time: String! startDate: String! endDate: String!): Courses
		deleteGroup(id: ID!): Courses
	}

	extend type Subscription {
		groups: [Courses!]!
	}
`