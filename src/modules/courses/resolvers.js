import model from './model'
import onlineLessonModel from '../online-lessons/model'
import subcourseModel from '../sub-courses/model'
import groupModel from '../groups/model'
import { pubsub } from '@pubsub'
import { verify } from '@lib/jwt'
const NEW_COURSE = 'NEW_COURSE'

export default {
	Query: {
		byHashtag: async(_, { hashtag }) => {
			try {
				return model.courses(hashtag)
			}
			catch(error) {
				throw new Error(error)
			}
		},
		courses: async(_, {}, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				return model.allCourses(branchID)
			}
			catch(error) {
				throw new Error(error)
			}
		},
		byCourseID: async(_, { courseID }, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				return model.byCourseID(courseID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createCourse: async(_, { name, price, description, subcourseID }, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				const newCourse = await model.newCourse(name, price, description, subcourseID, branchID)
				pubsub.publish(NEW_COURSE)
				return newCourse 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateCourse: async(_, { id, name, price, description }) => {
			try {
				const updatedCourse = await model.updateCourse(id, name, price, description)
				pubsub.publish(NEW_COURSE)
				return updatedCourse 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteCourse: async(_, { id }) => {
			try {
				const deletedCourse = await model.deleteCourse(id)
				pubsub.publish(NEW_COURSE)
				return deletedCourse
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		courses: {
			resolve: async(_, {}, { authorization }) => {
				try {
					const branchID = verify(authorization).branchID
					return model.allCourses(branchID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_COURSE])
		}
	},
	Courses: {
		id: 	global => global.study_center_course_id,
		name: 	global => global.study_center_course_name,
		price: global => global.study_center_course_price,
		description: global => global.study_center_course_description,
		onlineLessons: async(global) => await onlineLessonModel.onlineLessons(global.study_center_course_id),
		subCourses: async global => await subcourseModel.subcourses(global.study_center_course_id),
		groups: async global => await groupModel.byCourseID(global.study_center_course_id)
	}
}