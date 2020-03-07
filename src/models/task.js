const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Tasks',taskSchema);

module.exports = (Task);

// const task1 = new Task({
//     description: "Learn JS"
// });

// task1.save().then(()=>{
//     console.log(task1);
// }).catch((error)=>{
//     console.log(error);
// })