import express from 'express'
import {scriptMakerController} from '../controllers/index.js'

const router = express.Router()

router.post('/create-original-script', scriptMakerController.createOriginalScript)
router.post('/generate-script', scriptMakerController.generateScript)

export default router