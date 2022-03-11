import { fetch, fetchAll } from '@lib/postgres'

const TELEGRAM = `
	SELECT
		* 
	FROM
		study_center_student_telegram 
	WHERE
		study_center_student_id = $1
`

const NEW_TELEGRAM = `
	INSERT INTO
		study_center_student_telegram(study_center_student_telegram, study_center_student_id)
	VALUES($1, $2)
	RETURNING 
		*
`

const UPDATE_TELEGRAM = `
	UPDATE
		study_center_student_telegram
	SET
		study_center_student_telegram = $2
	WHERE
		study_center_student_telegram_id = $1
	RETURNING 
		*
`

const DELETE_TELEGRAM = `
	DELETE FROM
		study_center_student_telegram
	WHERE
		study_center_student_telegram_id = $1
	RETURNING 
		*
`

const studentTelegrams 					= (studentID) 				=> fetchAll(TELEGRAM, studentID)
const newStudentTelegrams 				= (telegram, studentID) 		=> fetch(NEW_TELEGRAM, telegram, studentID)
const updateStudentTelegrams 			= (id, telegram) 				=> fetch(UPDATE_TELEGRAM, id, telegram)
const deleteStudentTelegrams 			= (id) 						=> fetch(DELETE_TELEGRAM, id)

export default {
	studentTelegrams,
	newStudentTelegrams,
	updateStudentTelegrams,
	deleteStudentTelegrams
}