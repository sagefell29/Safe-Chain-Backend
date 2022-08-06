const { Blob } = require('node:buffer')
const FileAPI = require('file-api'), File = FileAPI.File
const fs = require('fs')

const makeFileObjects = (content) => {
    const obj = content
    const jsonObj = JSON.parse(obj)
    const jsonContent = JSON.stringify(jsonObj)
    fs.writeFile("output.json", jsonContent, 'utf-8', (err) => {
        if (err) {
            return console.log(err)
        }
        console.log("The file was saved!")
    })
    const files = [new File('./output.json')]
    return files
}

module.exports = makeFileObjects 
