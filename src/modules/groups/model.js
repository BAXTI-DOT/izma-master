import { fetch, fetchAll } from '@lib/postgres'

const GROUPS = `
	SELECT
		g.study_center_group_id,
		g.study_center_group_name,
		g.study_center_course_id,
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
		study_center_groups g
	LEFT JOIN
		study_center_colleagues t
	ON
		g.study_center_teacher_id = t.study_center_colleague_id
	LEFT JOIN
		study_center_branch_rooms r
	ON 
		g.study_center_room_id = r.study_center_branch_room_id
	LEFT JOIN
		study_center_courses c
	ON 
		g.study_center_course_id = c.study_center_course_id
	WHERE
		g.study_center_branch_id = $1
`

const BY_COURSE_ID = `
	SELECT
		g.study_center_group_id,
		g.study_center_group_name,
		g.study_center_course_id,
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
		study_center_groups g
	LEFT JOIN
		study_center_colleagues t
	ON
		g.study_center_teacher_id = t.study_center_colleague_id
	LEFT JOIN
		study_center_branch_rooms r
	ON 
		g.study_center_room_id = r.study_center_branch_room_id
	WHERE
		g.study_center_course_id = $1
`

const BY_TEACHER_ID = `
	SELECT
		g.study_center_group_id,
		g.study_center_group_name,
		g.study_center_course_id,
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
		study_center_groups g
	LEFT JOIN
		study_center_colleagues t
	ON
		g.study_center_teacher_id = t.study_center_colleague_id
	LEFT JOIN
		study_center_branch_rooms r
	ON 
		g.study_center_room_id = r.study_center_branch_room_id
	WHERE
		g.study_center_teacher_id = $1
`

const BY_GROUP_ID = `
	SELECT
		g.study_center_group_id,
		g.study_center_group_name,
		g.study_center_course_id,
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
		r.study_center_branch_room,
		c.study_center_course_id,
		c.study_center_course_price,
		c.study_center_course_name
	FROM
		study_center_groups g
	LEFT JOIN
		study_center_colleagues t
	ON
		g.study_center_teacher_id = t.study_center_colleague_id
	LEFT JOIN
		study_center_branch_rooms r
	ON 
		g.study_center_room_id = r.study_center_branch_room_id
	LEFT JOIN
		study_center_courses c
	ON 
		g.study_center_course_id = c.study_center_course_id
	WHERE
		g.study_center_group_id = $
`


const STUDENT_COUNT = `
	SELECT
		count(study_center_student_group_id)
	FROM 
		study_center_student_groups
	WHERE
		study_center_student_group = $1
`

const NEW_GROUP = `
	INSERT INTO
		study_center_groups(
			study_center_group_name, 
			study_center_course_id, 
			study_center_teacher_id, 
			study_center_group_days,
			study_center_room_id,
			study_center_group_lesson_start_time,
			study_center_group_lesson_start_date,
			study_center_group_lesson_end_date,
			study_center_branch_id
		)
	VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
	RETURNING 
		*
`

const UPDATE_GROUP = `
	UPDATE
		study_center_groups
	SET
		study_center_group_name = $2, 
		study_center_course_id = $3, 
		study_center_teacher_id = $4, 
		study_center_group_days = $5,
		study_center_room_id = $6,
		study_center_group_lesson_start_time = $7,
		study_center_group_lesson_start_date = $8,
		study_center_group_lesson_end_date = $9
	WHERE
		study_center_group_id  = $1
	RETURNING 
		*
`

const DELETE_GROUP = `
	DELETE FROM
		study_center_groups
	WHERE
		study_center_group_id = $1
	RETURNING 
		*
`

const groups = (branchID) => fetchAll(GROUPS, branchID)

const newGroup = (
		name, 
		courseID, 
		teacherID, 
		days, 
		room, 
		startTime, 
		startDate, 
		endDate, 
		branchID
	) 	=> fetch(
		NEW_GROUP, 
		name, 
		courseID, 
		teacherID, 
		days, 
		room, 
		startTime, 
		startDate, 
		endDate, 
		branchID
	)

const updateGroup 	= async(
		groupID,
		name, 
		courseID, 
		teacherID, 
		days, 
		room, 
		startTime, 
		startDate, 
		endDate
	) 	=> {

		const oldGroup = await fetch('SELECT * FROM study_center_groups WHERE study_center_group_id = $1', groupID)

		return fetch(
			UPDATE_GROUP,
			groupID,
			name ? name : oldGroup.study_center_group_name, 
			courseID ? courseID : oldGroup.study_center_course_id , 
			teacherID ? teacherID : oldGroup.study_center_teacher_id , 
			days ? days : oldGroup.study_center_group_days , 
			room ? room : oldGroup.study_center_group_room , 
			startTime ? startTime : oldGroup.study_center_group_lesson_start_time, 
			startDate ? startDate : oldGroup.study_center_group_lesson_start_date, 
			endDate ? endDate : oldGroup.study_center_group_lesson_end_date
		)
	}
const deleteGroup 	= (id) 		=> fetch(DELETE_GROUP, id)
const byCourseID 	= (courseID) => fetchAll(BY_COURSE_ID, courseID)
const byTeacherID 	= (teacherID) => fetchAll(BY_TEACHER_ID, teacherID)
const studentCount 	= (groupID) 	=> fetch(STUDENT_COUNT, groupID)
const byGroupID 	= (groupID) => fetchAll(BY_GROUP_ID, groupID)

export default {
	groups,
	newGroup,
	updateGroup,
	deleteGroup,
	byCourseID,
	byTeacherID,
	studentCount,
	byGroupID
}