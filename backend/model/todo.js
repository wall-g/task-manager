import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdOn: {
        type: String,
        required: true
    }
})

const todo = mongoose.model('todo', todoSchema);
export default todo;