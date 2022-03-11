import { fetch, fetchAll } from '@lib/postgres'

const REGIONS = `
	SELECT
		* 
	FROM
		regions 
	WHERE
		country_id = $1
`

const NEW_REGION = `
	INSERT INTO
		regions(region_name, country_id)
	VALUES($1, $2)
	RETURNING 
		*
`

const UPDATE_REGION = `
	UPDATE
		regions
	SET
		region_name = $2
	WHERE
		region_id = $1
	RETURNING 
		*
`

const DELETE_REGION = `
	DELETE FROM
		regions
	WHERE
		region_id = $1
	RETURNING 
		*
`

const regions 		= (countryID) 	=> fetchAll(REGIONS, countryID)
const newRegion 	= (name, countryID) 		=> fetch(NEW_REGION, name, countryID)
const updateRegion 	= (id, name) 	=> fetch(UPDATE_REGION, id, name)
const deleteRegion 	= (id) 			=> fetch(DELETE_REGION, id)

export default {
	regions,
	newRegion,
	updateRegion,
	deleteRegion
}