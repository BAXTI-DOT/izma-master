import model from './model'
import { verify } from '@lib/jwt'
import { pubsub } from '@pubsub'
const NEW_LEAD = 'NEW_LEAD'

export default {
	Query: {
		leads: async(_, {}, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				return model.leads(branchID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		newLeadForm: async(_, { name, phoneNumber, comment, course, hashtag }) => {
			try {
				const newLead = await model.newLeadHashtag(name, phoneNumber, comment, course, hashtag)
				pubsub.publish(NEW_LEAD)
				return newLead 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		newLeadAdmin: async(_, { name, phoneNumber, comment }, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				const newLead = await model.newLeadBranchID(name, phoneNumber, comment, branchID)
				pubsub.publish(NEW_LEAD)
				return newLead 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateLead: async(_, { name, phone, birthday, gender, comment, courseID, leadID }) => {
			try {
				const updatedLead = await model.updateLead(leadID, name, phone, birthday, gender, comment, courseID)
				pubsub.publish(NEW_LEAD)
				return updatedLead 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteLead: async(_, { leadID }) => {
			try {
				const deletedLead = await model.deleteLead(leadID)
				pubsub.publish(NEW_LEAD)
				return deletedLead
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		leads: {
			resolve: async(_, {}, { authorization }) => {
				try {
					const branchID = verify(authorization).branchID
					return model.leads(branchID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_LEAD])
		}
	},
	Leads: {
		id: 	global => global.lead_id,
		name: 	global => global.lead_name,
		phoneNumber: 	global => global.lead_tel,
		birthday: 	global => global.lead_birthday ? global.lead_birthday : "",
		gender: 	global => global.lead_gender ? global.lead_gender : 0,
		comment: 	global => global.lead_comment ? global.lead_comment : "" ,
		course: 	global => global.study_center_course_name ? global.study_center_course_name : ""
	}
}