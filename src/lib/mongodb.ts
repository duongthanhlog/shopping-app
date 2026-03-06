import mongoose from 'mongoose'

export const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI!
    let isConnected = false
    try {
        await mongoose.connect(MONGODB_URI)
        isConnected = true
    } catch (err) {
        console.log(err)
    }
}
