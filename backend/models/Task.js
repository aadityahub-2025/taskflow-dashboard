import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        default: 'Study'
    },
    priority: {
        type: String,
        required: true,
        default: 'High'
    },
    dueDate: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
