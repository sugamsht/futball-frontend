import dbConnect from '../../lib/dbConnect';
import Players from '../../models/Players';

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const players = await Players.find({})
                res.status(200).json({ success: true, data: players })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const player = await Players.create(req.body)
                res.status(201).json({ success: true, data: player })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}