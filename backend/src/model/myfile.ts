import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let MyFile = new Schema({
    tip: {
        type: String
    },
    datum: {
        type: String
    },
    ime: {
        type: String
    },
    prezime:{
        type: String
    },
    velicina: {
        type: String
    },
    naziv: {
        type: String
    },
    prioritet:{
        type: Number
    }
});

export default mongoose.model('MyFile', MyFile, 'fajlovi');