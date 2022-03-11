import { fetch, fetchAll } from '@lib/postgres'

const COUNTRIES = `
	SELECT
		* 
	FROM
		countries 
`

const NEW_COUNTRY = `
	INSERT INTO
		countries(country_name)
	VALUES($1)
	RETURNING 
		*
`

const UPDATE_COUNTRY = `
	UPDATE
		countries
	SET
		country_name = $2
	WHERE
		country_id = $1
	RETURNING 
		*
`

const DELETE_COUNTRY = `
	DELETE FROM
		countries
	WHERE
		country_id = $1
	RETURNING 
		*
`

const countries 	= () 			=> fetchAll(COUNTRIES)
const newCountry 	= (name) 		=> fetch(NEW_COUNTRY, name)
const updateCountry = (id, name) 	=> fetch(UPDATE_COUNTRY, id, name)
const deleteCountry = (id) 			=> fetch(DELETE_COUNTRY, id)

export default {
	countries,
	newCountry,
	updateCountry,
	deleteCountry
}