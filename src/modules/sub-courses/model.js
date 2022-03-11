import { fetch, fetchAll } from '@lib/postgres'

const DEGREES = `
	SELECT
		s.study_center_course_id,
		s.study_center_course_name,
		s.study_center_course_price,
		s.study_center_course_description,
		m.study_center_subcourse_id
	FROM
		study_center_courses s
	INNER JOIN 
		study_center_courses m
	ON
		s.study_center_course_id = m.study_center_subcourse_id
	WHERE
		s.study_center_subcourse_id = $1
`

const NEW_DEGREE = `
	INSERT INTO
		study_center_course_degrees(
			study_center_course_degree_title, 
			study_center_course_degree_price,
			study_center_course_degree_description,
			study_center_course_id
		)
	VALUES($1, $2, $3, $4)
	RETURNING 
		*
`

const UPDATE_DEGREE = `
	UPDATE
		study_center_course_degrees
	SET
		study_center_course_degree_title = $2, 
		study_center_course_degree_price =$3,
		study_center_course_degree_description = $4
	WHERE
		study_center_course_degree_id = $1
	RETURNING 
		*
`

const DELETE_DEGREE = `
	DELETE FROM
		study_center_course_degrees
	WHERE
		study_center_course_degree_id = $1
	RETURNING 
		*
`

const subcourses 		= (courseID) 	=> fetchAll(DEGREES, courseID)
const newDegree 	= (title, price, description, courseID) 		=> fetch(NEW_DEGREE, title, price, description, courseID)
const updateDegree 	= async(title, price, description, degreeID) 	=> {

	const oldDegree = await fetch(`SELECT * from study_center_course_degrees WHERE study_center_course_degree_id = $1`,degreeID)

	return fetch(
		UPDATE_DEGREE,
		degreeID,
		title ? title : oldDegree.study_center_course_degree_title, 
		price ? price : oldDegree.study_center_course_degree_price, 
		description ? description : oldDegree.study_center_course_degree_description
	)
}
const deleteDegree 	= (id) 			=> fetch(DELETE_DEGREE, id)

export default {
	subcourses,
	newDegree,
	updateDegree,
	deleteDegree
}