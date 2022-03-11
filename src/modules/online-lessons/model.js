import { fetch, fetchAll } from '@lib/postgres'

const ONLINE_LESSONS = `
	SELECT
		* 
	FROM
		study_center_online_lessons
	WHERE
		study_center_course_id = $1
`

const BY_GROUP_ID = `
	SELECT
		g.study_center_group_id,
		g.study_center_course_id,
		o.study_center_online_lesson_id,
		o.study_center_online_lesson_title,
		o.study_center_course_id
	FROM
		study_center_groups g
	INNER JOIN 
		study_center_online_lessons O
	ON
		g.study_center_course_id = o.study_center_course_id
	WHERE
		g.study_center_group_id = $1
`

const NEW_ONLINE_LESSON = `
	INSERT INTO
		study_center_online_lessons(
			study_center_online_lesson_title,
			study_center_course_id
		)
	VALUES($1, $2)
	RETURNING 
		*
`

const UPDATE_ONLINE_LESSON = `
	UPDATE
		study_center_online_lessons
	SET
		study_center_online_lesson_title = $2
	WHERE
		study_center_online_lesson_id = $1
	RETURNING 
		*
`

const DELETE_ONLINE_LESSON = `
	DELETE FROM
		study_center_online_lessons
	WHERE
		study_center_online_lesson_id = $1
	RETURNING 
		*
`

const onlineLessons 		= (courseID) 				=> fetchAll(ONLINE_LESSONS, courseID)
const newOnlineLesson 		= (title, courseID) 		=> fetch(NEW_ONLINE_LESSON, title, courseID)
const updateOnlineLesson 	= (id, title) 				=> fetch(UPDATE_ONLINE_LESSON, id, title)
const deleteOnlineLesson 	= (id) 						=> fetch(DELETE_ONLINE_LESSON, id)
const onlineLessonByGroup 	= (id) => fetchAll(BY_GROUP_ID, id)

export default {
	onlineLessons,
	newOnlineLesson,
	updateOnlineLesson,
	deleteOnlineLesson,
	onlineLessonByGroup
}