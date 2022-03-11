import model from './model'
import { pubsub } from '@pubsub'
import { verify } from '@lib/jwt'
const NEW_CASH = 'NEW_CASH'

export default {
	Query: {
		studentCash: async(_, { studentID }) => {
			try {
				return model.studentCash(studentID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		newCash: async(_, { studentID, type, amount, comment }, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				const newCash = await model.newCash(amount, type, comment, studentID, branchID)
				pubsub.publish(NEW_CASH)
				return newCash 
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		regions: {
			studentCash: async(_, { studentID }) => {
				try {
					return model.studentCash(studentID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_CASH])
		}
	},
	Cash: {
		id: 	global => global.cash_id,
		type: 	global => global.cash_type,
		amount: 	global => global.count,
		comment: 	global => global.cash_comment,
	}
}