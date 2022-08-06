const makeFileObjects = require('./file')
const { getAccessToken, makeStorageClient } = require('./client')
const storeFiles = async (files) => {
    const client = makeStorageClient()
    const fileObjects = makeFileObjects(files)
    const cid = await client.put(fileObjects)
    return cid
}

module.exports = storeFiles