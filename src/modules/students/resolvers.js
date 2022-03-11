import model from './model'
import { pubsub } from '@pubsub'
import { verify } from '@lib/jwt'
import addressModel from '../student-address/model'
import groupModel from '../student-groups/model'
import parentModel from '../parent-phone/model'
import phoneModel from '../student-phone/model'
import telegramModel from '../student-telegram/model'
import cashModel from '../student-cash/model'
const NEW_REGION = 'NEW_REGION'

export default {
	Query: {
		students: (_, { studentName, courseID }, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				return model.students(branchID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createStudent: async(_, { phone, name, birthday, gender, photo, password, groupID, comment, newNumber, parentNumber, telegram, address }, { authorization }) => {
			try {

				const branchID = verify(authorization).branchID

				const newStudent = await model.newStudent(name, birthday, gender, comment, password, branchID, phone)

				for(let i of newNumber) {
					phoneModel.newStudentNumber(i.number, newStudent.study_center_student_id)
				}

				for(let i of parentNumber) {
					parentModel.newParentNumber(i.number, newStudent.study_center_student_id)
				}

				for(let i of telegram) {
					telegramModel.newStudentTelegrams(i.telegram, newStudent.study_center_student_id)
				}

				for(let i of address) {
					addressModel.newStudentAddress(i.address, newStudent.study_center_student_id)
				}

				for(let i of groupID) {
					groupModel.newStudentGroup(i.groupID, newStudent.study_center_student_id)
				}

				return newStudent
				
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateStudent: async(_, { studentID, phone, name, birthday, gender, photo, password, groupID, comment, newNumber, parentNumber, telegram, address }) => {
			try {
				const updatedRegion = await model.updateRegion(id, name)
				pubsub.publish(NEW_REGION)
				return updatedRegion 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteRegion: async(_, { id }) => {
			try {
				const deletedRegion = await model.deleteRegion(id)
				pubsub.publish(NEW_REGION)
				return deletedRegion
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		regions: {
			resolve: async(_, { countryID }) => {
				try {
					return model.regions(countryID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_REGION])
		}
	},
	Students: {
		id: 	global => global.study_center_student_id,
		mainPhone: 	global => global.study_center_student_phone,
		name: 	global => global.study_center_student_name,
		birthday: 	global => global.study_center_student_birthday,
		gender: 	global => global.study_center_student_gender,
		comment: 	global => global.study_center_student_comment,
		password: 	global => global.study_center_student_password,
		phoneNumber: 	async global => await phoneModel.studentNumbers(global.study_center_student_id),
		parentNumber: 	async global => await parentModel.parentNumbers(global.study_center_student_id),
		groups: 	async global => await groupModel.studentGroups(global.study_center_student_id),
		telegram: 	async global => await telegramModel.studentTelegrams(global.study_center_student_id),
		address: 	async global => await addressModel.studentAdresses(global.study_center_student_id),
		cash: 	async global => {
			const cashStudent = await cashModel.studentCash(global.study_center_student_id)
			return cashStudent ? cashStudent.count : "0" 
		}
	}
}