const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    token: { type: String, required: true },
    passwords: { type: [String], required: true, default: [] },
    credit_cards: { type: [String], required: true, default: [] }
})

module.exports = mongoose.model('User', UserSchema)
