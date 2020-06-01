import mongoose, { Schema, Document } from 'mongoose'

export interface IReply extends Document {
    text: string,
    created_on?: Date,
    reported?: boolean,
    delete_password: string
}
const ReplySchema = new Schema({
    text: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: new Date(),
    },
    reported: {
        type: Boolean,
        default: false
    },
    delete_password:{
        type: String
    }
})

export default mongoose.model<IReply>('Reply', ReplySchema, 'replies')