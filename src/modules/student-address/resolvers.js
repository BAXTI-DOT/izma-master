import model from './model'
import { pubsub } from '@pubsub'
const NEW_ADDRESS = 'NEW_ADDRESS'

export default {
	Query: {
		studentAddress: (_, { studentID }) => {
			try {
				return model.studentAdresses(studentID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		studentAddress: {
			resolve: async(_, { studentID }) => {
				try {
					return model.studentAdresses(studentID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_ADDRESS])
		}
	},
	StudentAddress: {
		id: 	global => global.study_center_student_address_id,
		address: 	global => global.study_center_student_address
	}
}