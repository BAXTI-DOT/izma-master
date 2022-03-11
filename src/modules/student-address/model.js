import { fetch, fetchAll } from '@lib/postgres'

const ADDRESS = `
	SELECT
		* 
	FROM
		study_center_student_address 
	WHERE
		study_center_student_id = $1
`

const NEW_ADDRESS = `
	INSERT INTO
		study_center_student_address(study_center_student_address, study_center_student_id)
	VALUES($1, $2)
	RETURNING 
		*
`

const UPDATE_ADDRESS = `
	UPDATE
		study_center_student_address
	SET
		study_center_student_address = $2
	WHERE
		study_center_student_address_id = $1
	RETURNING 
		*
`

const DELETE_ADDRESS = `
	DELETE FROM
		study_center_student_address
	WHERE
		study_center_student_address_id = $1
	RETURNING 
		*
`

const studentAdresses 					= (studentID) 				=> fetchAll(ADDRESS, studentID)
const newStudentAddress 				= (address, studentID) 		=> fetch(NEW_ADDRESS, address, studentID)
const updateStudentAddress 			= (id, address) 				=> fetch(UPDATE_ADDRESS, id, address)
const deleteStudentAddress 			= (id) 						=> fetch(DELETE_ADDRESS, id)

export default {
	studentAdresses,
	newStudentAddress,
	updateStudentAddress,
	deleteStudentAddress
}