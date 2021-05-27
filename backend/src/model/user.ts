import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    mail: {
        type: String
    },
    password: {
        type: String
    },
    pwchg: {
        type: Number
    },
    name: {
        type: String
    },
    lastname: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    title: {
        type: String
    },
    office: {
        type: String
    },
    status: {
        type: String
    },
    picture: {
        type: String
    },
    bio: {
        type: String
    },
    website: {
        type: String
    },
    type: {
        type: String
    },
    predmeti:{
        type:Array
    }
})

export default mongoose.model('User', User, 'users');