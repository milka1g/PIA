import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let PlanAng = new Schema({
    sifra: {
        type: String
    },
    username: {
        type: String
    },
    grupa: {
        type: String
    }
});

export default mongoose.model('PlanAng', PlanAng, 'planAng');