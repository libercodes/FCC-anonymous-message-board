import mongoose, { Schema, Document } from 'mongoose'

export interface IThread extends Document {
    text: string,
    delete_password: string,
    created_on?: Date,
    bumped_on?: Date,
    reported?: boolean,
    replies?: Schema.Types.ObjectId[],
    replyCount?: number,
    board: string
}

const ThreadSchema = new Schema({
    text: {
        type: String
    },
    created_on: {
        type: Date,
        default: new Date()
    },
    bumped_on: {
        type: Date,
        default: new Date()
    },
    reported: {
        type: Boolean,
        default: false
    },
    delete_password: {
        type: String
    },
    replies: [{
        type: Schema.Types.ObjectId, 
        ref: 'Reply'
    }],
    replyCount: {
        type: Number,
        default: 0
    },
    board: {
        type: String,
        required: true
    }
})

export default mongoose.model<IThread>('Thread', ThreadSchema, 'threads')