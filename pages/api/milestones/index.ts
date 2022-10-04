import { NextApiHandler } from 'next'
import { prisma } from '@/lib/prisma'
import { getSession } from 'next-auth/react'

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req })
    if (!session) return res.end()

    const childrenId = parseInt(req.query.childrenId as string)

    if (req.method === 'GET') {
        const milestones = await prisma.milestones.findUnique({
            where: {
                childrenId: childrenId,
            },
            select: {
                milestones: true,
            },
        })
        if (!milestones) {
            return res.status(404).json({ message: 'Not found milestones' })
        }
        return res.status(200).json(milestones)
    }

    if (req.method === 'PUT') {
        const { childrenId, mile } = req.body
        const milestones = mile

        await prisma.milestones.update({
            where: {
                childrenId: parseInt(childrenId),
            },
            data: {
                milestones,
            },
        })

        res.end()
    }
}

export default handler
