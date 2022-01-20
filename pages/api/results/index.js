import dbConnect from '../../../lib/dbConnect';
import Results from '../../../models/Results';

export default async function handler(req, res) {
    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const results = await Results.find({})
                res.status(200).json({ success: true, data: results })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const result = await Results.create(req.body)
                res.status(201).json({ success: true, data: result })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}