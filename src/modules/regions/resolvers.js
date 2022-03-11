import model from './model'
import { pubsub } from '@pubsub'
const NEW_REGION = 'NEW_REGION'

export default {
	Query: {
		regions: (_, { countryID }) => {
			try {
				return model.regions(countryID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createRegion: async(_, { name, countryID }) => {
			try {
				const newRegion = await model.newRegion(name, countryID)
				pubsub.publish(NEW_REGION)
				return newRegion 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateRegion: async(_, { id, name }) => {
			try {
				const updatedRegion = await model.updateRegion(id, name)
				pubsub.publish(NEW_REGION)
				return updatedRegion 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteRegion: async(_, { id }) => {
			try {
				const deletedRegion = await model.deleteRegion(id)
				pubsub.publish(NEW_REGION)
				return deletedRegion
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		regions: {
			resolve: async(_, { countryID }) => {
				try {
					return model.regions(countryID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_REGION])
		}
	},
	Regions: {
		id: 	global => global.region_id,
		name: 	global => global.region_name
	}
}