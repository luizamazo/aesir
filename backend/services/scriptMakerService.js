import {scriptMakerDB} from '../db/index.js'

export const storeOriginalScript = async (scriptDetails) => {
    try{
        let result = {},
        {system} = scriptDetails, 
        {scriptType} = scriptDetails,
        {script} = scriptDetails
        result = await scriptMakerDB.create(scriptDetails)
        console.log('result', result);
        result.status = 201
        return result
    }catch(e){
        console.error(e)
    }
}

export const storeGeneratedScript = async (generatedScript) => {

    let result = await scriptMakerDB.create(generatedScript)
        .then(response => {
            console.log('response', response)
        }).catch(e => {
            console.error('erro no store generated script', e)
        })
    result.status = 201
    return res.json(result)

}

export const getOriginalScriptFromType = async (details) => {
    return await scriptMakerDB.find({scriptType: details.scriptType})
        .then(response => {
            return response
        }).catch(e => {
            console.error('e no get original script', e)
        })
}
