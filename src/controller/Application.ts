import mongoose from 'mongoose'
import { DB_CONFIG, URI } from '../utils/config'

export const ApplicationRun = async() => {
    console.log(`server running on port ${process.env.PORT}`)
    await mongoose.connect(URI, DB_CONFIG)
}