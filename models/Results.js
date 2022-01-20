import mongoose from 'mongoose'

let resultSchema = new mongoose.Schema({
    fixtureResult: { type: String, required: true },
    score: [Number],
    fouls: [Number],
    offsides: [Number],
    corners: [Number],
    shots: [Number]
});

export default mongoose.models.Results || mongoose.model('Results', resultSchema)