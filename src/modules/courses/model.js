import { fetch, fetchAll } from '@lib/postgres'

const STUDY_CENTER_COURSES = `
	SELECT
		*
	FROM
		study_center_courses
	WHERE
		study_center_branch_id = $1
`

const BY_COURSE_ID = `
	SELECT
		*
	FROM
		study_center_courses
	WHERE
		study_center_course_id = $1
`
 
const COURSES = `
	SELECT
		*
	FROM
		study_center_courses
	NATURAL JOIN 
		study_center_branches
	WHERE
		study_center_branch_hashtag = $1
`

const NEW_COURSE = `
	INSERT INTO
		study_center_courses(
			study_center_course_name, 
			study_center_course_price, 
			study_center_course_description, 
			study_center_subcourse_id,
			study_center_branch_id
		)
	VALUES($1, $2, $3, $4, $5)
	RETURNING 
		*
`

const UPDATE_COURSE = `
	UPDATE
		study_center_courses
	SET
		study_center_course_name = $2,
		study_center_course_price = $3,
		study_center_course_description = $4
	WHERE
		study_center_course_id = $1
	RETURNING 
		*
`

const DELETE_COURSE = `
	DELETE FROM
		study_center_courses
	WHERE
		study_center_course_id = $1
	RETURNING 
		*
`

const allCourses 	= (branchID) 								=> fetchAll(STUDY_CENTER_COURSES, branchID)
const courses 		= (hashtag) 								=> fetchAll(COURSES, hashtag)
const newCourse 	= (name, price, description, subcourseID, centerID) 		=> fetch(NEW_COURSE, name, price, description, subcourseID, centerID)
const updateCourse 	= (id, name, price, description) 	=> fetch(UPDATE_COURSE, id, name, price, description)
const deleteCourse 	= (id) 								=> fetch(DELETE_COURSE, id)
const byCourseID 	= (courseID) => fetchAll(BY_COURSE_ID, courseID)

export default {
	courses,
	newCourse,
	updateCourse,
	deleteCourse,
	allCourses,
	byCourseID
}