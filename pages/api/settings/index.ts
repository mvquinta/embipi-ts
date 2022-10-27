import { NextApiHandler } from 'next';
import { prisma } from '@/lib/prisma';
import { getSession } from 'next-auth/react';

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) return res.end();

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    const children = await prisma.children.findMany({
        where: {
            authorId: req.body.sessionId,
        },
    });

    if (!user && !children) return res.status(401).json({ message: 'User not found' });

    if (req.method === 'PUT') {
        await prisma.user.update({
            where: {
                id: session.user.id,
            },
            data: {
                name: req.body.values.userName,
                lastName: req.body.values.lastName,
                email: req.body.values.email,
            },
        });

        await prisma.children.update({
            where: {
                authorId: session.user.id,
            },
            data: {
                userBabyName: req.body.values.userBabyName,
                userBabyBirth: req.body.values.userBabyBirth,
                userBabyGender: req.body.values.userBabyGender,
                userBabyMonths: req.body.babyMonths,
                userBabyHeight: Number(req.body.values.userBabyHeight),
                userBabyWeight: Number(req.body.values.userBabyWeight),
                userBabyHead: Number(req.body.values.userBabyHead),
            },
        });

        res.end();
    }

    if (req.method === 'DELETE') {
        await prisma.milestones.delete({
            where: {
                childrenId: children[0].id,
            },
        });

        await prisma.children.delete({
            where: {
                authorId: session.user.id,
            },
        });

        await prisma.user.delete({
            where: {
                id: session.user.id,
            },
        });

        res.status(200).end();
        return;
    }
};

export default handler;
