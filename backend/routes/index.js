import express from 'express'
import {scriptMakerController} from '../controllers/index.js'

const router = express.Router()

const teste = () => {
    console.log('afs')
}
router.get('', teste)
router.post('/create-original-script', scriptMakerController.createOriginalScript)
router.post('/generate-script', scriptMakerController.generateScript)

export default router