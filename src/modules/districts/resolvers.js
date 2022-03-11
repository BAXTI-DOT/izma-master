import model from './model'
import { pubsub } from '@pubsub'
const NEW_DISTRICT = 'NEW_DISTRICT'

export default {
	Query: {
		districts: (_, { regionID }) => {
			try {
				return model.districts(regionID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createDistrict: async(_, { name, regionID }) => {
			try {
				const newDistrict = await model.newDistrict(name, regionID)
				pubsub.publish(NEW_DISTRICT)
				return newDistrict 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateDistrict: async(_, { id, name }) => {
			try {
				const updatedDistrict = await model.updateDistrict(id, name)
				pubsub.publish(NEW_DISTRICT)
				return updatedDistrict 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteDistrict: async(_, { id }) => {
			try {
				const deletedDistrict = await model.deleteDistrict(id)
				pubsub.publish(NEW_DISTRICT)
				return deletedDistrict
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		districts: {
			resolve: async(_, { regionID }) => {
				try {
					return model.districts(regionID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_DISTRICT])
		}
	},
	Districts: {
		id: 	global => global.district_id,
		name: 	global => global.district_name
	}
}