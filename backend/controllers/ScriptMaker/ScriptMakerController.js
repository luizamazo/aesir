import {files} from '../../utils/index.js'
import {scriptMakerService} from '../../services/index.js'
import path from 'path'

export const createOriginalScript = async (req, res, next) => {
    try{
        let result = await scriptMakerService.storeOriginalScript(req.body)
        res.json(result)
    }catch(e){
        console.error(e)
    }
}

export const updateOriginalScript = async (req, res) => {
    try {
        const originalScriptId = req.param("id");
        let result = await scriptMakerService.updateOriginalScript(originalScriptId, req.body);
        res.json(result);
    } catch (e) {
        console.log(e);
    }
}

export const generateScript = async (req, res, next) => {
    const scriptDetails = req.body 
    if(scriptDetails.system == 'Contratos'){
        await generateContratosScript(scriptDetails)
    }else{
        await generatePatrimonioScript(scriptDetails)
    }   
}

const generateContratosScript = (scriptDetails) => {
    switch (scriptDetails.type) {
        case 'Exclusão Alteração Contratual':
            deleteExclusaoAlteracaoContratual(scriptDetails)
            break;
    
        default:
            break;
    }
}

const deleteExclusaoAlteracaoContratual = (scriptDetails) => {
    if(scriptDetails.db = 'MSSQL'){
        generateExclusaoAlteracaoContratualMssql(scriptDetails)
    }else if(scriptDetails.db = 'POSTGRES'){
        generateExclusaoAlteracaoContratualPostgres(scriptDetails)
    }else if(scriptDetails.db = 'ORACLE'){
        generateExclusaoAlteracaoContratualOracle(scriptDetails)
    }
}

const generateExclusaoAlteracaoContratualMssql = async (scriptDetails) => {
    path = './files/MSSQL/Contratos/'
    let fileContent = await files.readFile(`${path}ExclusaoAlteracaoContratual.txt`)
    fileContent = fileContent.replace('contId', scriptDetails.contId)
    files.writeFile(`${path}Result/ExclusaoAlteracaoContratual-${new Date()}.sql`)
}

const generatePatrimonioScript = async (scriptDetails) => {
    let originalScript = await scriptMakerService.getOriginalScriptFromType(scriptDetails)
    switch (scriptDetails.scriptType) {
        case "Excluir Importação":
                excluirImportacao(originalScript, scriptDetails)
            break;
        default:
            break;
    }
}

const excluirImportacao = async (originalScript, scriptDetails) => {
    const {registroEntradaId} = scriptDetails,
    script = originalScript[0].script
    let generatedScript = ''
    for(let patrimonioId of scriptDetails.patrimonios){
        for(let statement of Object.values(script)){
            if(statement.includes('#registroEntradaId')){
                statement = statement.replace('#registroEntradaId', registroEntradaId)
                statement += '\n'
            }else if(statement.includes('#patrimonioId')){
                statement = statement.replace('#patrimonioId', patrimonioId)
                statement += '\n'
                if(statement.includes('@fimScript')){
                    statement = statement.replace('@fimScript', '')
                    statement += '\n \n \n \n '
                }
            }
            generatedScript += statement 
        }
    }
    let filePath =  path.resolve('files', 'ScriptMakerFiles', 'excluirImigracacao.sql') 
    await files.writeFile(filePath, generatedScript)
}
