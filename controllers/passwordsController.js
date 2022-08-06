const encryption = require('../scripts/encryption')
const decryption = require('../scripts/decryption')
const IPFS = require('ipfs-mini')
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const User = require('../models/User')

const savePassword = async (req, res) => {
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
        const cid = await ipfs.add(encrpytedData)
        if (!cid) {
            return res.json({ success: false, message: "Error Saving Password. Try Again Later." })

        }
        const update = await User.updateOne({ token: token }, { $push: { passwords: cid } })
        if (!update.acknowledged) {
            return res.json({ success: false, message: "Error Saving Password. Try Again Later." })
        }
        res.json({ success: true, message: "Password saved successfully", data: encrpytedData })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error Occured. Try Again Later." })
    }
}

const getPassword = (req, res) => {
    try {
        const { token } = req.body
        const decryptedData = decryption(text, token)
        res.json({ success: true, message: "Password retrieved successfully", data: decryptedData })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error Occured. Try Again Later." })
    }
}


module.exports = { savePassword, getPassword }