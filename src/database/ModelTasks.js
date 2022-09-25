const mongoose = require("mongoose")
const schema = mongoose.Schema

const taskSchema = new schema({
    title: String,
    checked: Boolean,
    listId: schema.ObjectId,
})

const task = mongoose.model("task",taskSchema)
module.exports = task