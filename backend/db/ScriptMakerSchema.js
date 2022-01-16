import mongoose from 'mongoose'

const ScriptMakerSchema = new mongoose.Schema({
    system: {
        type: String,
        required: true
    },
    scriptType: {
        type: String,
        required: true
    },
    script: {
        type: Object,
        required: true
    }
})

export default new mongoose.model('ScriptMaker', ScriptMakerSchema)

