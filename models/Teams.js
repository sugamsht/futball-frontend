import mongoose from 'mongoose'

let teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    logo: String,
    manager: { type: String },
    played: { type: Number, default: 0 },
    win: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    draw: { type: Number, default: 0 },
    gd: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    playerList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'players' }]
});

export default mongoose.models.Teams || mongoose.model('Teams', teamSchema)