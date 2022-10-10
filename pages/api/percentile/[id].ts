import { NextApiHandler } from 'next'
import { prisma } from 'lib/prisma'
import { getSession } from 'next-auth/react'

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req })
    if (!session) return res.end()

    if (req.method === 'GET') {
        const percentile = await prisma.percentile.findUnique({
            where: {
                id: parseInt(req.query.id as string),
            },
        })
        if (!percentile) {
            return res.status(404).json({ message: 'Not Found' })
        }
        res.status(200).json(percentile)
    }
    if (req.method === 'PUT') {
        const { gender, data } = req.body

        await prisma.percentile.update({
            data: {
                gender,
                data,
            },
            where: {
                id: parseInt(req.query.id as string),
            },
        })
        return res.status(200).end()
    }
    if (req.method === 'DELETE') {
        await prisma.percentile.delete({
            where: {
                id: parseInt(req.query.id as string),
            },
        })
        return res.status(200).end()
    }
}

export default handler
