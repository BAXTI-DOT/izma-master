import { fetch, fetchAll } from '@lib/postgres'

const STUDENTS = `
	SELECT
		* 
	FROM
		study_center_students 
	WHERE
		study_center_branch_id = $1
`

const BY_GROUP_ID = `
	SELECT
		s.study_center_student_id,
		s.study_center_student_name,
		s.study_center_student_phone,
		g.study_center_student_group,
		g.study_center_student_id
	FROM 	
		study_center_students s
	INNER JOIN
		study_center_student_groups g
	ON
		g.study_center_student_id = s.study_center_student_id
	WHERE
		g.study_center_student_group = $1
`

const NEW_STUDENT = `
	INSERT INTO
		study_center_students(
			study_center_student_name, 
			study_center_student_birthday,
			study_center_student_gender,
			study_center_student_comment,
			study_center_student_password,
			study_center_branch_id,
			study_center_student_phone
		)
	VALUES($1, $2, $3, $4, crypt($5, gen_salt('bf')), $6, $7)
	RETURNING 
		*
`

const UPDATE_STUDENT = `
	UPDATE
		study_center_students
	SET
		study_center_student_name = $2, 
		study_center_student_birthday = $3,
		study_center_student_gender = $4,
		study_center_student_comment = $5,
		study_center_student_password = crypt($6, gen_salt('bf')),
		study_center_student_phone = $7
	WHERE
		study_center_student_id  = $1
	RETURNING 
		*
`

const DELETE_STUDENT = `
	DELETE FROM
		study_center_students
	WHERE
		study_center_student_id = $1
	RETURNING 
		*
`

const students 		= (branchID) 	=> fetchAll(STUDENTS, branchID)
const newStudent 	= (name, birthday, gender, comment, password, branchID, phone) 		=> fetch(NEW_STUDENT, name, birthday, gender, comment, password, branchID, phone)
const updateStudent 	= (id, name, birthday, gender, comment, password, phone) 	=> fetch(UPDATE_STUDENT, id, name, birthday, gender, comment, password, phone)
const deleteStudent 	= (id) 			=> fetch(DELETE_STUDENT, id)
const studentByGroupID 	= (groupID) => fetchAll(BY_GROUP_ID, groupID)

export default {
	students,
	newStudent,
	updateStudent,
	deleteStudent,
	studentByGroupID
}