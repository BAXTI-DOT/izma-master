import { fetch, fetchAll } from '@lib/postgres'

const LEADS = `
	SELECT
		l.lead_id,
		l.lead_name,
		l.lead_tel,
		l.lead_birthday,
		l.lead_gender,
		l.lead_comment,
		l.lead_course_id,
		l.study_center_branch_id,
		s.study_center_course_id,
		s.study_center_course_name
	FROM 
		leads l
	LEFT JOIN 
		study_center_courses s
	ON 
		l.lead_course_id = s.study_center_course_id
	WHERE
		l.study_center_branch_id = $1
`
const NEW_LEAD = `
	INSERT INTO 
		leads(lead_name, lead_tel, lead_comment, study_center_branch_id, lead_course_id)
	VALUES($1, $2, $3, $4, $5)
	RETURNING 
		*
`
const UPDATE_LEAD = `
	UPDATE 
		leads
	SET
		lead_name = $2,
		lead_tel = $3,
		lead_birthday = $4,
		lead_gender = $5,
		lead_comment = $6,
		lead_course_id = $7
	WHERE
		lead_id = $1
	RETURNING
		*
`
const DELETE_LEAD = `
	DELETE FROM
		leads
	WHERE
		lead_id = $1
	RETURNING 
		*
`
const leads = (branchID) => fetchAll(LEADS, branchID)
const newLeadHashtag = async(name, phone, comment, courseID, hashtag) => {

	const {study_center_branch_id: branchID } = await fetch(`SELECT study_center_branch_id FROM study_center_branches WHERE study_center_branch_hashtag = $1`, hashtag)

	return fetch(
		NEW_LEAD,
		name,
		phone,
		comment,
		branchID,
		courseID
	)
}
const newLeadBranchID = (name, phone, comment, branchID, courseID) => fetch(NEW_LEAD, name, phone, comment, branchID, null)
const updateLead = async(leadID, name, phone, birthday, gender, comment, courseID) => {

	const oldLead = await fetch('SELECT * FROM  leads WHERE lead_id = $1', leadID)

	return fetch(
		UPDATE_LEAD,
		leadID,
		name ? name: oldLead.lead_name,
		phone ? phone : oldLead.lead_tel,
		birthday ? birthday : oldLead.lead_birthday,
		gender ? gender : oldLead.lead_gender,
		comment ? comment : oldLead.lead_comment,
		courseID ? courseID : oldLead.lead_course_id
	)

}

const deleteLead = (leadID) => fetch(DELETE_LEAD, leadID)

export default {
	leads,
	newLeadHashtag,
	newLeadBranchID,
	updateLead,
	deleteLead
}