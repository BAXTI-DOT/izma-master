import model from './model'
import { pubsub } from '@pubsub'
const NEW_TELEGRAM = 'NEW_TELEGRAM'

export default {
	Query: {
		studentTelegram: (_, { studentID }) => {
			try {
				return model.studentTelegrams(studentID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		studentTelegram: {
			resolve: async(_, { studentID }) => {
				try {
					return model.studentTelegrams(studentID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_TELEGRAM])
		}
	},
	StudentTelegram: {
		id: 	global => global.study_center_student_telegram_id,
		telegram: 	global => global.study_center_student_telegram
	}
}