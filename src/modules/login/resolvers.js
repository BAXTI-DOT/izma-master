import model from './model'
import hashtagModel from '../hashtag/model'
import { sign } from '@lib/jwt'
import { AuthenticationError } from 'apollo-server-express'

export default {
	Mutation: {
		login: async(_, { phoneNumber, password, hashtag }) => {
			try {
				const branchID = await hashtagModel.bybranchID(hashtag)

				if(!branchID) throw new Error("Error in space or in branch")

				const rows = await model.login(phoneNumber, password, branchID.study_center_branch_id)

				if(!rows) throw new AuthenticationError("You are not logged in, check spaces")

				return sign({ branchID: rows.study_center_branch_id, colleagueID: rows.study_center_colleague_id, status: rows.status })
			}
			catch(error) {
				throw new Error(error)
			}
		}
	}
}