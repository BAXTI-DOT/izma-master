import model from './model'
import onlineLessonModel from '../online-lessons/model'
import studentModel from '../students/model'
import { pubsub } from '@pubsub'
import { verify } from '@lib/jwt'
const NEW_COURSE = 'NEW_COURSE'

export default {
	Query: {
		groups: async(_, { teacherID, courseID }, { authorization }) => {
			try {
				let courseArr = []

				if(teacherID[0] && courseID[0]) {
					let arr = []

					for(let i of teacherID) {
						const data = await model.byTeacherID(i)
						for(let m of data) {
							arr.push(m)
						}
					}

					for(let i of courseID) {
						const data = await model.byCourseID(i)
						for(let m of data) {
							arr.push(m)
						}
					}

					let uniqueList = []
					let dupList = []

					Array.prototype.contains = function(item){
					  let filtered_item = this.filter((i) => {
					    return i.study_center_group_id === item.study_center_group_id
					  })
					  return !!filtered_item.length
					}

					function contains(list, item){
					  let filtered_item = list.filter((i) => {
					    return i.study_center_group_id === item.study_center_group_id
					  })
					  return !!filtered_item.length
					}

					function pushToUniqueList(item){
					  if(!uniqueList.contains(item)) uniqueList.push(item)
					}

					function pushToDuplicateList(item){
					  if(!dupList.contains(item)) dupList.push(item)
					}

					for(let i = 0; i < arr.length; i++ ){
					  if(uniqueList.contains(arr[i])){
					    pushToDuplicateList(arr[i])
					  } else {
					    pushToUniqueList(arr[i])
					  }
					}

					if(dupList.length === 0) {
						for(let i of uniqueList) {
							courseArr.push(i)
						}
					} else {
						for(let i of dupList) {
							courseArr.push(i)
						}
					}
				}

				else if(teacherID[0]) {
					for(let i of teacherID) {
						const data = await model.byTeacherID(i)
						for(let m of data) {
							courseArr.push(m)
						}
					}
				} 

				else if(courseID[0]) {
					for(let i of courseID) {
						const data = await model.byCourseID(i)
						for(let m of data) {
							courseArr.push(m)
						}
					}
				}

				else {
					const branchID = verify(authorization).branchID
					const data =  await model.groups(branchID)

					for(let i of data) {
						courseArr.push(i)
					}
				}

				console.log(courseArr)

				return courseArr

			}
			catch(error) {
				throw new Error(error)
			}
		},
		byGroupID: async(_, { groupID }) => {
			try {
				return model.byGroupID(groupID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createGroup: async(_, { name, courseID, teacherID, days, roomID, time, startDate, endDate }, { authorization }) => {
			try {
				const branchID = verify(authorization).branchID
				const newGroup = await model.newGroup(name, courseID, teacherID, days, roomID, time, startDate, endDate, branchID)
				pubsub.publish(NEW_COURSE)
				return newGroup 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateGroup: async(_, { groupID, name, courseID, teacherID, days, roomID, time, startDate, endDate }) => {
			try {
				const updatedGroup = await model.updateGroup(groupID, name, courseID, teacherID, days, roomID, time, startDate, endDate)
				pubsub.publish(NEW_COURSE)
				return updatedGroup 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteGroup: async(_, { id }) => {
			try {
				const deletedGroup = await model.deleteGroup(id)
				pubsub.publish(NEW_COURSE)
				return deletedGroup
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		groups: {
			resolve: async(_, {}, { authorization }) => {
				try {
					const branchID = verify(authorization).branchID
					return model.groups(branchID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_COURSE])
		}
	},
	Groups: {
		id: 	global => global.study_center_group_id,
		name: 	global => global.study_center_group_name,
		teacher: global => global.study_center_colleague_name,
		days: global => global.study_center_group_days,
		rooms: global => global.study_center_branch_room,
		time: global => global.study_center_group_lesson_start_time,
		startDate: global => global.study_center_group_lesson_start_date,
		endDate: global => global.study_center_group_lesson_end_date,
		studentsCount: async global => {
			const { count } = await model.studentCount(global.study_center_group_id)
			return count
		},
		price: global => global.study_center_course_price,
		courseName: global => global.study_center_course_name,
		onlineLessons: async(global) => await onlineLessonModel.onlineLessonByGroup(global.study_center_group_id),
		students: async(global) => await studentModel.studentByGroupID(global.study_center_group_id)
	}
}