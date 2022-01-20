import dbConnect from '../../../lib/dbConnect';
import Fixtures from '../../../models/fixtures';

export default async function handler(req, res) {

    const { method } = req

    await dbConnect()

    switch (method) {
        case 'GET':
            try {
                const fixtures = await Fixtures.find({})
                res.status(200).json({ success: true, data: fixtures })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'POST':
            try {
                const fixture = await Fixtures.create(req.body)
                res.status(201).json({ success: true, data: fixture })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.status(400).json({ success: false })
            break
    }
}