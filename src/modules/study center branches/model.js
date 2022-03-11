import { fetch, fetchAll } from '@lib/postgres'

const BY_CENTER_ID = `
	SELECT
		* 
	FROM
		study_center_branches 
	WHERE
		study_center_id = $1
`

const BY_DISTRICT_ID = `
	SELECT
		* 
	FROM
		study_center_branches 
	WHERE
		district_id = $1
`


const NEW_BRANCH = `
	INSERT INTO
		study_center_branches (study_center_branch_name, study_center_branch_number, 
		study_center_branch_hashtag, study_center_id, district_id)
	VALUES($1, $2, $3, $4, $5)
	RETURNING 
		*
`

const UPDATE_BRANCH = `
	UPDATE
		study_center_branches
	SET
		study_center_branch_name = $2,
		study_center_branch_number = $3,
		study_center_branch_password = crypt($4, gen_salt('bf')),
		study_center_branch_hashtag = $5
	WHERE
		study_center_branch_id = $1
	RETURNING 
		*
`

const DELETE_BRANCH = `
	DELETE FROM
		study_center_branches
	WHERE
		study_center_branch_id = $1
	RETURNING 
		*
`

const byCenter 			= (centerID) 				=> fetchAll(BY_CENTER_ID, centerID)
const byDistrict 			= (districtID) 				=> fetchAll(BY_DISTRICT_ID, districtID)
const newBranch 		= (name, number, hashtag, centerID, districtID) 	=> fetch(NEW_BRANCH, name, number, hashtag, centerID, districtID)
const updateBranch 	= async(id, name, number, password, hashtag) 	=> {

	const oldBranch = await fetch('SELECT * FROM study_center_branches WHERE study_center_branch_id = $1', id)

	return fetch(
		UPDATE_BRANCH, 
		id,
		name ? name : oldBranch.study_center_branch_name,
		number ? number : oldBranch.study_center_branch_number, 
		password ? password : oldBranch.study_center_branch_password,
		hashtag ? hashtag : oldBranch.study_center_branch_hashtag
	)
}
const deleteBranch 	= (id) 						=> fetch(DELETE_BRANCH, id)

export default {
	byCenter,
	byDistrict,
	newBranch,
	updateBranch,
	deleteBranch
}