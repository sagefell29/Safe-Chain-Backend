const encryption = require('../scripts/encryption')

const savePassword = (req, res) => {
    try {
        const { name, website, username, password, description } = req.body
        const token = req.header('token')
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

module.exports = { savePassword }