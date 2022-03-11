import model from './model'
import { pubsub } from '@pubsub'
const NEW_ONLINE_LESSON = 'NEW_ONLINE_LESSON'

export default {
	Query: {
		onlineLessons: (_, { courseID }) => {
			try {
				return model.onlineLessons(courseID)
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Mutation: {
		createOnlineLesson: async(_, { title, courseID }) => {
			try {
				const newOnlineLesson = await model.newOnlineLesson(title, courseID)
				pubsub.publish(NEW_ONLINE_LESSON)
				return newOnlineLesson 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		updateOnlineLesson: async(_, { title, lessonID }) => {
			try {
				const updatedOnlineLesson = await model.updateOnlineLesson(lessonID, title)
				pubsub.publish(NEW_ONLINE_LESSON)
				return updatedOnlineLesson 
			}
			catch(error) {
				throw new Error(error)
			}
		},
		deleteOnlineLesson: async(_, { id }) => {
			try {
				const deletedLesson = await model.deleteOnlineLesson(id)
				pubsub.publish(NEW_ONLINE_LESSON)
				return deletedLesson
			}
			catch(error) {
				throw new Error(error)
			}
		}
	},
	Subscription: {
		onlineLessons: {
			resolve: async(_, { courseID }) => {
				try {
					return model.onlineLessons(courseID)
				}
				catch(error) {
					throw error
				}
			},
			subscribe: () => pubsub.asyncIterator([NEW_ONLINE_LESSON])
		}
	},
	OnlineLessons: {
		id: 	global => global.study_center_online_lesson_id,
		title: 	global => global.study_center_online_lesson_title
	}
}