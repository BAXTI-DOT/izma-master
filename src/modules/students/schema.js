import { gql } from 'apollo-server-express'

export default gql`
	type Students {
		id: ID!
		mainPhone: String!
		name: String!
		birthday: String!
		gender: String!
		comment: String!
		password: String!
		phoneNumber: [PhoneNumber!]!
		parentNumber: [ParentNumber!]!
		groups: [Groups!]!
		telegram: [StudentTelegram!]!
		address: [ StudentAddress!]!
		cash: Cash
	}

	extend type Query {
		students(studentName: String! courseID: [ID!]!): [Students!]!
	}

	input PhoneInput {
		number: String
	}

	input TelegramInput {
		telegram: String
	}

	input AddressInput {
		address: String
	}

	input GroupInput {
		groupID: String
	}

	extend type Mutation {
		createStudent(
			phone: String! 
			name: String! 
			birthday: String 
			password: String!
			gender: Int 
			photo: String
			groupID: [GroupInput!]!
			comment: String
			newNumber: [PhoneInput]
			parentNumber: [PhoneInput]
			telegram: [TelegramInput]
			address: [AddressInput]
		): Students

		updateStudent(
			studentID: ID!
			name: String! 
			birthday: String 
			password: String
			gender: Int 
			photo: String
			groupID: ID
			comment: String
		): Students

		deleteStudent(studentID: ID!): Students
	}

	extend type Subscription {
		students(countryID: ID!): [Regions!]!
	}
`