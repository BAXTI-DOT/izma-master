import { fetch, fetchAll } from '@lib/postgres'

const PHONE_NUMBERS = `
	SELECT
		* 
	FROM
		study_center_student_parent_phone 
	WHERE
		study_center_student_id = $1
`

const NEW_PHONE_NUMBER = `
	INSERT INTO
		study_center_student_parent_phone(study_center_parent_phone, study_center_student_id)
	VALUES($1, $2)
	RETURNING 
		*
`

const UPDATE_PHONE_NUMBER = `
	UPDATE
		study_center_student_parent_phone
	SET
		study_center_parent_phone = $2
	WHERE
		study_center_parent_phone_id = $1
	RETURNING 
		*
`

const DELETE_PHONE_NUMBER = `
	DELETE FROM
		study_center_student_parent_phone
	WHERE
		study_center_parent_phone_id = $1
	RETURNING 
		*
`

const parentNumbers 				= (studentID) 				=> fetchAll(PHONE_NUMBERS, studentID)
const newParentNumber 				= (phone, studentID) 		=> fetch(NEW_PHONE_NUMBER, phone, studentID)
const updateParentNumber 			= (id, name) 				=> fetch(UPDATE_PHONE_NUMBER, id, phone)
const deleteParentNumber 			= (id) 						=> fetch(DELETE_PHONE_NUMBER, id)

export default {
	parentNumbers,
	newParentNumber,
	updateParentNumber,
	deleteParentNumber
}