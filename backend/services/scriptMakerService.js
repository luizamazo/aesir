import {scriptMakerDB} from '../db'

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
    try{
        let result = await scriptMakerDB.create(generatedScript)
        result.status = 201
        return res.json(result)
    }catch(e){
        console.error(e)
    }
}
