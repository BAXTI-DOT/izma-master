import model from './model'
import { pubsub } from '@pubsub'
const NEW_NUMBER = 'NEW_NUMBER'

export default {
	Query: {
		parentPhones: (_, { studentID }) => {
			try {
				return model.parentNumbers(studentID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		parentPhones: {
			resolve: async(_, { studentID }) => {
				try {
					return model.parentNumbers(studentID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_NUMBER])
		}
	},
	ParentNumber: {
		id: 	global => global.study_center_parent_phone_id,
		phone: 	global => global.study_center_parent_phone
	}
}