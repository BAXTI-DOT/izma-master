import model from './model'
import { verify } from '@lib/jwt'

export default {
	Query: {
		hashtag: async(_, {}, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				console.log(authorization)
				const { study_center_branch_hashtag: hashtag } = await model.hashtag(branchID)
				return hashtag
			}
			catch(error) {
				throw new Error(error)
			}
		}
	}
}