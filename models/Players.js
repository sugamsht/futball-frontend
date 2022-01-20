import mongoose from 'mongoose'

let playerSchema = new mongoose.Schema({
    team_name: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    dob: { type: Date, default: Date.now },
    position: { type: String, required: true },
    jersey_no: { type: Number }
});

export default mongoose.models.Players || mongoose.model('Players', playerSchema);