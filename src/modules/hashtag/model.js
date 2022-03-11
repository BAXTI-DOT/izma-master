import { fetch } from '@lib/postgres'

const HASHTAG = `
	SELECT
		study_center_branch_hashtag
	FROM
		study_center_branches 
	WHERE
		study_center_branch_id = $1
`

const BY_BRANCH_ID = `
	SELECT
		study_center_branch_id
	FROM
		study_center_branches
	WHERE
		study_center_branch_hashtag = $1
`

const hashtag 		= (branchID) => fetch(HASHTAG, branchID)
const bybranchID 	= (hashtag) => fetch(BY_BRANCH_ID, hashtag)

export default {
	hashtag,
	bybranchID
}