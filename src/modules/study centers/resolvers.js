import model from './model'
import { pubsub } from '@pubsub'
const NEW_EDU_CENTER = 'NEW_EDU_CENTER'

export default {
	Query: {
		studyCenters: (_, { regionID }) => {
			try {
				return model.studyCenter(regionID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createStudyCenter: async(_, { name, phoneNumber, regionID }) => {
			try {
				const newStudyCenter = await model.newStudyCenter(name, phoneNumber, regionID)
				pubsub.publish(NEW_EDU_CENTER)
				return newStudyCenter 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateStudyCenter: async(_, { id, name, phoneNumber }) => {
			try {
				const updatedStudyCenter = await model.updateStudyCenter(id, name, phoneNumber)
				pubsub.publish(NEW_EDU_CENTER)
				return updatedStudyCenter
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteStudyCenter: async(_, { id }) => {
			try {
				const deletedStudyCenter = await model.deleteStudyCenter(id)
				pubsub.publish(NEW_EDU_CENTER)
				return deletedStudyCenter
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		studyCenters: {
			resolve: async(_, { regionID }) => {
				try {
					return model.studyCenter(regionID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_EDU_CENTER])
		}
	},
	StudyCenters: {
		id: 	global => global.study_center_id,
		name: 	global => global.study_center_name,
		phoneNumber: global => global.study_center_number
	}
}