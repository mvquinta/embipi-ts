import { NextApiHandler } from 'next'
import { prisma } from '@/lib/prisma'

//Utils handler. Only being used to send(post) json data to database and check(get) if data is correct
//App api logic is on file api/percentile/[id].ts

const handler: NextApiHandler = async (req, res) => {
    if (req.method === 'GET') {
        const percentiles = await prisma.percentile.findMany()
        res.status(200).json(percentiles)
        return
    }

    if (req.method === 'POST') {
        const { gender, data } = req.body

        if (!gender) {
            return res
                .status(400)
                .json({ message: 'Missing required parameter `gender`' })
        }

        if (!data) {
            return res
                .status(400)
                .json({ message: 'Missing required parameter `data`' })
        }

        await prisma.percentile.create({
            data: {
                gender,
                data,
            },
        })

        return res.status(200).end()
    }

    res.status(405).json({ message: 'Method Not Allowed' })
}

export default handler
