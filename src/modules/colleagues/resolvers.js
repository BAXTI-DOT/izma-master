import model from './model'
import { chooseRole } from '../../config'
import { pubsub } from '@pubsub'
import { verify } from '@lib/jwt'
const NEW_COLLEAGUE = 'NEW_COLLEAGUE'

export default {
	Query: {
		colleagues: (_, {}, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				return model.colleagues(branchID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createColleague: async(_, { name, phoneNumber, birthday, password, gender, comment, photo, status }, { authorization }) => { 
			try {
				// console.log(name, phoneNumber, birthday, password, gender, comment, photo)
				const branchID = verify(authorization).branchID
				const newColleague = await model.newColleague(name, password, gender, comment, phoneNumber, photo, birthday, branchID, status)
				pubsub.publish(NEW_COLLEAGUE)
				return newColleague 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateColleague: async(_, { id, name, phoneNumber, password, gender, comment, photo }, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				const updatedColleague = await model.updateColleague(name, gender, comment, phoneNumber, password, photo, branchID, id)
				pubsub.publish(NEW_COLLEAGUE)
				return updatedColleague 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteColleague: async(_, { id }) => {
			try {
				const deletedColleague = await model.deleteColleague(id)
				pubsub.publish(NEW_COLLEAGUE)
				return deletedColleague
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		colleagues: {
			resolve: async(_, {}, { authorization }) => {
				try {
					const branchID = verify(authorization).branchID
					return model.colleagues(branchID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_COLLEAGUE])
		}
	},
	Colleagues: {
		id: 	global => global.study_center_colleague_id,
		name: 	global => global.study_center_colleague_name,
		phoneNumber: global => global.study_center_colleague_phone,
		password: global => global.study_center_colleague_password,
		gender: global => global.study_center_colleague_gender == 1 ? 'Male' : 'Ayol',
		bio : global => global.study_center_colleague_bio,
		photo: global => global.study_center_colleague_photo,
		status: global => chooseRole(global.status)
	}
}