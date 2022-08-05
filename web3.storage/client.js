require('dotenv').config()
const { Web3Storage } = require('web3.storage')

const getAccessToken = () => {
    return process.env.WEB3_STORAGE_API_KEY
}

const makeStorageClient = () => {
    return new Web3Storage({ token: getAccessToken() })
}

module.exports = { getAccessToken, makeStorageClient }
