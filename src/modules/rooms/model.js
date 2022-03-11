import { fetch, fetchAll } from '@lib/postgres'

const ROOMS = `
	SELECT
		* 
	FROM
		study_center_branch_rooms 
	WHERE
		study_center_branch_id = $1
`

const NEW_ROOM = `
	INSERT INTO
		study_center_branch_rooms(study_center_branch_room, study_center_branch_id)
	VALUES($1, $2)
	RETURNING 
		*
`

const UPDATE_ROOM = `
	UPDATE
		study_center_branch_rooms
	SET
		study_center_branch_room = $2
	WHERE
		study_center_branch_room_id = $1
	RETURNING 
		*
`

const DELETE_ROOM = `
	DELETE FROM
		study_center_branch_rooms
	WHERE
		study_center_branch_room_id = $1
	RETURNING 
		*
`

const rooms 		= (branchID) 			=> fetchAll(ROOMS, branchID)
const newRoom 		= (name, branchID) 		=> fetch(NEW_ROOM, name, branchID)
const updateRoom 	= (id, name) 			=> fetch(UPDATE_ROOM, id, name)
const deleteRoom 	= (id) 					=> fetch(DELETE_ROOM, id)

export default {
	rooms,
	newRoom,
	updateRoom,
	deleteRoom
}