import model from './model'
import { pubsub } from '@pubsub'
const NEW_STUDENT_GROUP = 'NEW_STUDENT_GROUP'

export default {
	Query: {
		studentGroups: async(_, { studentID }) => {
			try {
				console.log(await model.studentGroups(studentID))
				return model.studentGroups(studentID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		studentGroups: {
			resolve: async(_, { studentID }) => {
				try {
					return model.studentGroups(studentID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_STUDENT_GROUP])
		}
	}
}