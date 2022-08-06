const encryption = require('../scripts/encryption')
const decryption = require('../scripts/decryption')
const savePassword = (req, res) => {
    try {
        const { name, website, username, password, description, token } = req.body
        const data = {
            name,
            website,
            username,
            password,
            description
        }
        const encrpytedData = encryption(data, token)
        res.json({ success: true, message: "Password saved successfully", data: encrpytedData })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error Occured. Try Again Later." })
    }
}

const getPassword = (req, res) => {
    try {
        const { text, token } = req.body
        const decryptedData = decryption(text, token)
        res.json({ success: true, message: "Password retrieved successfully", data: decryptedData })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error Occured. Try Again Later." })
    }
}


module.exports = { savePassword, getPassword }