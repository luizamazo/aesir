import {files} from '../../utils'
import {scriptMakerService} from '../../services'

export const createOriginalScript = async (req, res, next) => {
    try{
        let result = await scriptMakerService.storeOriginalScript(req.body)
        res.json(result)
    }catch(e){
        console.error(e)
    }
}

export const generateScript = (req, res, next) => {
    const {content} = req.body  
    const {scriptDetails} = content

    if(scriptDetails.system = 'Contratos'){
        generateContratosScript(scriptDetails)
    }else{
        generatePatrimonioScript(scriptDetails)
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

const generatePatrimoniosScript = (scriptDetails) => {

}
