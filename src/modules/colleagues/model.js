import { fetch, fetchAll } from '@lib/postgres'

const COLLEAGUE_TEACHERS = `
	SELECT
		*
	FROM
		study_center_colleagues 
	WHERE
		study_center_branch_id = $1
	AND
		status = 5
`

const NEW_COLLEAGUE = `
	INSERT INTO
		study_center_colleagues(
			study_center_colleague_name, 
			study_center_colleague_password,
			study_center_colleague_gender,
			study_center_colleague_comment,
			study_center_colleague_phone,
			study_center_colleague_photo,
			study_center_colleague_birthday,
			study_center_branch_id,
			status
		)
	VALUES($1, crypt($2, gen_salt('bf')), $3, $4, $5, $6, $7, $8, $9)
	RETURNING 
		*
`

const UPDATE_COLLEAGUE = `
	UPDATE
		study_center_colleagues
	SET
		study_center_colleague_name = $1, 
		study_center_colleague_gender = $2,
		study_center_colleague_comment = $3,
		study_center_colleague_phone = $4,
		study_center_colleague_password = $5,
		study_center_colleague_photo = $6,
		study_center_branch_id = $7
	WHERE
		study_center_colleague_id = $8
	RETURNING 
		*
`

const DELETE_COLLEAGUE = `
	DELETE FROM
		study_center_colleagues
	WHERE
		study_center_colleague_id = $1
	RETURNING 
		*
`

const colleagues 	= (branchID) => fetchAll(COLLEAGUE_TEACHERS, branchID)
const newColleague 	= (
	name, 
	password, 
	gender, 
	comment, 
	phone, 
	photo, 
	birthday,
	branchID,
	status
	) => fetch(
		NEW_COLLEAGUE, 
		name, 
		password, 
		gender, 
		comment, 
		phone, 
		photo, 
		birthday,
		branchID,
		status
	)

const updateColleague = async(
	name, 
	gender, 
	comment, 
	phone, 
	password, 
	photo, 
	branchID, 
	colleagueID
) 	=> {

	const oldColleague = await fetch('SELECT * from study_center_colleagues WHERE study_center_colleague_id = $1', colleagueID)

	return fetch(
		UPDATE_COLLEAGUE, 
		name ? name : oldColleague.study_center_colleague_name, 
		gender ? gender : oldColleague.study_center_colleague_gender, 
		comment ? comment : oldColleague.study_center_colleague_bio, 
		phone ? phone : oldColleague.study_center_colleague_phone, 
		password ? password : oldColleague.study_center_colleague_password, 
		photo ? photo : oldColleague.study_center_colleague_photo, 
		branchID ? branchID : oldColleague.study_center_branch_id,
		colleagueID
	)
}

const deleteColleague = (id) => fetch(DELETE_COLLEAGUE, id)

export default {
	colleagues,
	newColleague,
	updateColleague,
	deleteColleague
}