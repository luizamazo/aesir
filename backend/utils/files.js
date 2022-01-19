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
    fs.writeFile(path, content, err => { 
        if (err) throw err
        console.log(`Arquivo ${path} escrito com sucesso`)
    })
}
