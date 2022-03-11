import express from 'express'

const router = express.Router()

import HOME from './routes/home'
router
	.get('/', HOME.GET)
	
export default router
