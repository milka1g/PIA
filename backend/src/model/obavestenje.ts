import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Obavestenje = new Schema({
    id:{
        type:Number
    },
    predmeti: {
        type: Array
    },
    username: {
        type: String
    },
    ime: {
        type:String
    },
    prezime: {
        type:String
    },
    naslov: {
        type: String
    },
    datum: {
        type: String
    },
    tekst:{
        type:String
    },
    fajlovi:{
        type: Array
    }
});

export default mongoose.model('Obavestenje', Obavestenje, 'obavestenja');