import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email: {type: String, lowercase: true, required: [true, "email não pode ser vazio"], match: [/\S+@\S+\.\S+/, 'é inválido'], index: true},
    username: { type: String, required: [true, "email não pode ser vazio"], unique: true },
    name: { type: String },
    password: { type: String },
    roles: [String],
    profile_pic: { type: String },
    subroles: [String],
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User;