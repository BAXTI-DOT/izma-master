import model from './model'
import { pubsub } from '@pubsub'
const NEW_DEGREE = 'NEW_DEGREE'

export default {
	Query: {
		subCourse: (_, { courseID }) => {
			try {
				return model.degrees(courseID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createDegree: async(_, { name, price, description, courseID }) => {
			try {
				const newDegree = await model.newDegree(name, price, description, courseID)
				pubsub.publish(NEW_DEGREE)
				return newDegree 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateDegree: async(_, { name, price, description, degreeID }) => {
			try {
				const updatedDegree = await model.updateDegree(name, price, description, degreeID)
				pubsub.publish(NEW_DEGREE)
				return updatedDegree 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteDegree: async(_, { id }) => {
			try {
				const deletedDegree = await model.deleteDegree(id)
				pubsub.publish(NEW_DEGREE)
				return deletedDegree
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		courseDegrees: {
			resolve: async(_, { courseID }) => {
				try {
					return model.degrees(courseID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_DEGREE])
		}
	},
	Degrees: {
		id: 	global => global.study_center_course_degree_id,
		name: 	global => global.study_center_course_degree_title,
		price: 	global => global.study_center_course_degree_price,
		description: 	global => global.study_center_course_degree_description,
	}
}