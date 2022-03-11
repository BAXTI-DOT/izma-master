import model from './model'
import { pubsub } from '@pubsub'
import { verify } from '@lib/jwt'
const NEW_ROOM = 'NEW_ROOM'


export default {
	Query: {
		rooms: (_, {}, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				return model.rooms(branchID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createRoom: async(_, { name }, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				const newRoom = await model.newRoom(name, branchID)
				pubsub.publish(NEW_ROOM)
				return newRoom 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateRoom: async(_, { id, name }) => {
			try {
				const updatedRoom = await model.updateRoom(id, name)
				pubsub.publish(NEW_ROOM)
				return updatedRoom 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteRoom: async(_, { id }) => {
			try {
				const deletedRoom = await model.deleteRoom(id)
				pubsub.publish(NEW_ROOM)
				return deletedRoom
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		rooms: {
			resolve: async(_, {}, { authorization }) => {
				try {
					const branchID = verify(authorization)
					return model.rooms(branchID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_ROOM])
		}
	},
	Rooms: {
		id: 	global => global.study_center_branch_room_id,
		room: 	global => global.study_center_branch_room
	}
}