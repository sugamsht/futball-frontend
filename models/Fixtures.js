import mongoose from 'mongoose'

let fixtureSchema = new mongoose.Schema({
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    stadium: String,
    date: { type: String },
    time: String,
    fixname: String,
});

export default mongoose.models.Fixtures || mongoose.model('Fixtures', fixtureSchema)