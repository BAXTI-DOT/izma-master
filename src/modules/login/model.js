import { fetch } from '@lib/postgres'

const LOGIN = `
	SELECT
		*
	FROM
		study_center_colleagues
	WHERE
		study_center_colleague_phone = $1 
	AND
		study_center_colleague_password = crypt($2, study_center_colleague_password)
	AND
		study_center_branch_id = $3
`

const login = (phoneNumber, password, branchID) => fetch(LOGIN, phoneNumber, password, branchID)

export default {
	login
}