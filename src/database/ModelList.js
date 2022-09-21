const mongoose = require("mongoose")
const schema = mongoose.Schema

const listSchema =  new schema({
    title: {type: String}
})

const list = mongoose.model("list",listSchema)
module.exports = list