import { fetch } from '@lib/postgres'

const STUDENT_CASH_TOTAL = `
	SELECT
		cash_id,
		count(cash_amount),
		cash_type,
		cash_comment
	FROM
		study_center_student_cash 
	WHERE
		student_id = $1
	GROUP BY cash_id
`

const NEW_CASH = `
	INSERT INTO
		study_center_student_cash(cash_amount, cash_type, cash_comment, student_id, branch_id)
	VALUES($1, $2, $3, $4, $5)
	RETURNING 
		*
`

const studentCash 	= (studentID) 	=> fetch(STUDENT_CASH_TOTAL, studentID)
const newCash 	= (amount, type, comment, studentID, branchID) 		=> fetch(NEW_CASH, amount, type, comment, studentID, branchID)

export default {
	studentCash,
	newCash
}