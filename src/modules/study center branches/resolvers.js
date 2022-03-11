import model from './model'
import colleagueModel from '../colleagues/model'
import { pubsub } from '@pubsub'
const NEW_BRANCH = 'NEW_BRANCH'

export default {
	Query: {
		byCenterID: (_, { centerID }) => {
			try {
				return model.byCenter(centerID)
			}
			catch(error) {
				throw new Error(error)
			}
		},
		byDistrictID: (_, { districtID }) => {
			try {
				return model.byDistrict(districtID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createBranch: async(_, { branchName, phoneNumber, userName, userNumber, password, hashtag, centerID, districtID,colleagueStatus}) => {
			try {
				const newBranch = await model.newBranch(branchName, phoneNumber, hashtag, centerID, districtID)

				const newColleague = await colleagueModel.newColleague(userName, password, _, _, userNumber, _, _, newBranch.study_center_branch_id, colleagueStatus)

				pubsub.publish(NEW_BRANCH)

				return newBranch
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateBranch: async(_, { id, name, phoneNumber, password, hashtag }) => {
			try {
				const updatedBranch = await model.updateBranch(id, name, phoneNumber, hashtag)
				pubsub.publish(NEW_BRANCH)
				return updatedBranch
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteBranch: async(_, { id }) => {
			try {
				const deletedBranch = await model.deleteBranch(id)
				pubsub.publish(NEW_BRANCH)
				return deletedBranch
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		byCenterID: {
			resolve: async(_, { centerID }) => {
				try {
					return model.byCenter(centerID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_BRANCH])
		}
	},
	Branches: {
		id: 	global => global.study_center_branch_id,
		branchName: 	global => global.study_center_branch_name,
		phoneNumber: global => global.study_center_branch_number,
		password: global => global.study_center_branch_password,
		hashtag: global => global.study_center_branch_hashtag
	}
}