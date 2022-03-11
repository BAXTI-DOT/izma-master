import { fetch, fetchAll } from '@lib/postgres'

const STUDENT_GROUPS = `
	SELECT
		s.study_center_student_group,
		s.study_center_student_id,
		g.study_center_group_id,
		g.study_center_group_name,
		g.study_center_teacher_id,
		g.study_center_group_days,
		g.study_center_room_id,
		g.study_center_group_lesson_start_time,
		g.study_center_group_lesson_start_date,
		g.study_center_group_lesson_end_date,
		g.study_center_branch_id,
		t.study_center_colleague_id,
		t.study_center_colleague_name,
		r.study_center_branch_room_id,
		r.study_center_branch_room
	FROM
		study_center_student_groups s
	LEFT JOIN
		study_center_groups g 
	ON
		s.study_center_student_group = g.study_center_group_id
	LEFT JOIN
		study_center_colleagues t
	ON
		g.study_center_teacher_id = t.study_center_colleague_id
	LEFT JOIN
		study_center_branch_rooms r
	ON 
		g.study_center_room_id = r.study_center_branch_room_id
	WHERE
		s.study_center_student_id = $1
`

const NEW_STUDENT_GROUP = `
	INSERT INTO
		study_center_student_groups(study_center_student_group, study_center_student_id)
	VALUES($1, $2)
	RETURNING 
		*
`

const UPDATE_STUDENT_GROUP = `
	UPDATE
		study_center_student_groups
	SET
		study_center_student_group = $2
	WHERE
		study_center_student_group_id = $1
	RETURNING 
		*
`

const DELETE_STUDENT_GROUP = `
	DELETE FROM
		study_center_student_groups
	WHERE
		study_center_student_group_id = $1
	RETURNING 
		*
`

const studentGroups 				= (studentID) 				=> fetchAll(STUDENT_GROUPS, studentID)
const newStudentGroup 				= (groupID, studentID) 		=> fetch(NEW_STUDENT_GROUP, groupID, studentID)
const updateStudentGroup 			= (id, name) 				=> fetch(UPDATE_STUDENT_GROUP, id, groupID)
const deleteStudentGroup 			= (id) 						=> fetch(DELETE_STUDENT_GROUP, id)

export default {
	studentGroups,
	newStudentGroup,
	updateStudentGroup,
	deleteStudentGroup
}