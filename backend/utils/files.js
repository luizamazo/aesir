import fs from 'fs'

export const readFile = async (path) => {
    try{
        const fileContent = await fs.readFile(path, 'utf8')
    }catch(e){
        console.error(e)
    }
    return fileContent
}

export const writeFile = async (path, content) => {
    try{
        fs.write(path, content, 'utf8')
        console.log(`Arquivo ${path} escrito com sucesso`)
    }catch(e){
        console.log(e)
    }
}
