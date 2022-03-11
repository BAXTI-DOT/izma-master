import model from './model'
import { pubsub } from '@pubsub'
const NEW_NUMBER = 'NEW_NUMBER'

export default {
	Query: {
		studentPhones: (_, { studentID }) => {
			try {
				return model.studentNumbers(studentID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		studentPhones: {
			resolve: async(_, { studentID }) => {
				try {
					return model.studentNumbers(studentID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_NUMBER])
		}
	},
	PhoneNumber: {
		id: 	global => global.study_center_student_phone_id,
		phone: 	global => global.study_center_student_phone
	}
}