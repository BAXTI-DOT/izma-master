import { fetch, fetchAll } from '@lib/postgres'

const STUDY_CENTER = `
	SELECT
		* 
	FROM
		study_centers 
	WHERE
		region_id = $1
`

const NEW_STUDY_CENTER = `
	INSERT INTO
		study_centers(study_center_name, study_center_number, region_id)
	VALUES($1, $2, $3)
	RETURNING 
		*
`

const UPDATE_STUDY_CENTER = `
	UPDATE
		study_centers
	SET
		study_center_name = $2,
		study_center_number = $3
	WHERE
		study_center_id = $1
	RETURNING 
		*
`

const DELETE_STUDY_CENTER = `
	DELETE FROM
		study_centers
	WHERE
		study_center_id = $1
	RETURNING 
		*
`

const studyCenter 			= (regionID) 				=> fetchAll(STUDY_CENTER, regionID)
const newStudyCenter 		= (name, number, regionID) 	=> fetch(NEW_STUDY_CENTER, name, number, regionID)
const updateStudyCenter 	= async(id, name, number) 	=> {

	const oldStudyCenter = await fetch('SELECT * FROM study_centers WHERE study_center_id = $1', id)

	console.log(oldStudyCenter)

	return fetch(
		UPDATE_STUDY_CENTER, 
		id,
		name ? name : oldStudyCenter.study_center_name,
		number ? number : oldStudyCenter.study_center_number
	)
}
const deleteStudyCenter 	= (id) 						=> fetch(DELETE_STUDY_CENTER, id)

export default {
	studyCenter,
	newStudyCenter,
	updateStudyCenter,
	deleteStudyCenter
}