import { fetch, fetchAll } from '@lib/postgres'

const DISTRICTS = `
	SELECT
		* 
	FROM
		districts 
	WHERE
		region_id = $1
`

const NEW_DISTRICT = `
	INSERT INTO
		districts(district_name, region_id)
	VALUES($1, $2)
	RETURNING 
		*
`

const UPDATE_DISTRICT = `
	UPDATE
		districts
	SET
		district_name = $2
	WHERE
		district_id = $1
	RETURNING 
		*
`

const DELETE_DISTRICT = `
	DELETE FROM
		districts
	WHERE
		district_id = $1
	RETURNING 
		*
`

const districts 		= (regionID) 				=> fetchAll(DISTRICTS, regionID)
const newDistrict 		= (name, regionID) 			=> fetch(NEW_DISTRICT, name, regionID)
const updateDistrict 	= (id, name) 				=> fetch(UPDATE_DISTRICT, id, name)
const deleteDistrict 	= (id) 						=> fetch(DELETE_DISTRICT, id)

export default {
	districts,
	newDistrict,
	updateDistrict,
	deleteDistrict
}