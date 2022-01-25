import express from 'express'
import {scriptMakerController} from '../controllers/index.js'

const router = express.Router()

router.post('/original-scripts', scriptMakerController.createOriginalScript)
router.post('/generate-script', scriptMakerController.generateScript)

export default router