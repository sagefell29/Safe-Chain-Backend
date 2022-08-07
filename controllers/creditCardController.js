const encryption = require('../scripts/encryption')
const decryption = require('../scripts/decryption')
const ipfsAPI = require('ipfs-api')
const ipfs = ipfsAPI('ipfs.infura.io', '5001', { protocol: 'https' })

const User = require('../models/User')

const saveCreditCard = async (req, res) => {
    try {
        const { number, expiry_date, holder_name, cvv, bank_name, token } = req.body
        const data = {
            number,
            expiry_date,
            holder_name,
            cvv,
            bank_name
        }
        const encrpytedData = encryption(data, token)
        const buffer = new Buffer(encrpytedData)
        const file = await ipfs.files.add(buffer)
        if (!file[0].hash) {
            return res.json({ success: false, message: "Error Saving Credit Card Details. Try Again Later." })
        }
        const update = await User.updateOne({ token: token }, { $push: { credit_cards: file[0].hash } })
        if (!update.acknowledged) {
            return res.json({ success: false, message: "Error Saving Credit Card Details. Try Again Later." })
        }
        res.json({ success: true, message: "Credit Card saved successfully", data: encrpytedData })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error Occured. Try Again Later." })
    }
}

const getCreditCards = async (req, res) => {
    try {
        const { token } = req.body
        const user = await User.findOne({ token: token })
        if (!user) {
            return res.json({ success: false, message: "No user available." })
        }
        const cids = user.credit_cards
        const data = []
        for (var i = 0; i < cids.length; i++) {
            const files = await ipfs.files.get(cids[i])
            if (!files[0].content.toString('utf8')) {
                return res.json({ success: false, message: "Error getting data" })
            }
            const text = files[0].content.toString('utf8')
            const decryptedData = decryption(text, token)
            data.push(decryptedData)
        }
        res.json({ success: true, message: "Credit Card Details retrieved successfully", data: data })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: "Internal Server Error Occured. Try Again Later." })
    }
}

module.exports = { saveCreditCard, getCreditCards }