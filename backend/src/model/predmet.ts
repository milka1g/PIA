import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Predmet = new Schema({

    naziv : {
        type:String
    },
    tip: {
        type:String
    },
    odsek: {
        type:String
    },
    semestar: {
        type:Number
    },
    godina: {
        type:Number
    },
    sifra: {
        type:String
    },
    fond: {
        type:String
    },
    espb: {
        type:Number
    },
    cilj: {
        type:String
    },
    ishod: {
        type:String
    },
    predavanjaTerm: {
        type:Array
    },
    vezbeTerm: {
        type:Array
    },
    dodatno: {
        type:String
    },
    predavanjaMat: {
        type:Array
    },
    vezbeMat: {
        type:Array
    },
    ispitniRokovi: {
        type:Array
    },
    laboratorija: {
        type:Array
    },
    dodatnoLab:{
        type:String
    },
    deacIspitna:{
        type:Number
    },
    deacLab:{
        type:Number
    },
    deacDomaci:{
        type:Number
    },
    domaci:{
        type:Array
    },
    dodatnoDom:{
        type:String
    }
})

export default mongoose.model('Predmet',Predmet, 'predmeti');