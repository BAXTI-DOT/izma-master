import model from './model'
import { pubsub } from '@pubsub'
const NEW_COUNTRY = 'NEW_COUNTRY'

export default {
	Query: {
		countries: () => {
			try {
				return model.countries()
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createCountry: async(_, { name }) => {
			try {
				const newCountry = await model.newCountry(name)
				pubsub.publish(NEW_COUNTRY)
				return newCountry 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateCountry: async(_, { id, name }) => {
			try {
				const updatedCountry = await model.updateCountry(id, name)
				pubsub.publish(NEW_COUNTRY)
				return updatedCountry 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteCountry: async(_, { id }) => {
			try {
				const deletedCountry = await model.deleteCountry(id)
				pubsub.publish(NEW_COUNTRY)
				return deletedCountry
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		countries: {
			resolve: async() => {
				try {
					return model.countries()
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_COUNTRY])
		}
	},
	Countries: {
		id: 	global => global.country_id,
		name: 	global => global.country_name
	}
}