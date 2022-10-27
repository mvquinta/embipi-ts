//Need to add checkers to the POST sequence to handle potential error cases
import { NextApiHandler } from 'next';
import { prisma } from '@/lib/prisma';

import { getSession } from 'next-auth/react';
import milestones from '@/lib/milestones.json';
//import milestonesTips from '@/lib/milestonesTips.json'

const handler: NextApiHandler = async (req, res) => {
    const session = await getSession({ req });

    if (!session) return res.end();

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    if (!user) return res.status(401).json({ message: 'User not found' });

    if (req.method === 'POST') {
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name: req.body.data.userName,
                lastName: req.body.data.lastName,
            },
        });

        await prisma.children.create({
            data: {
                userBabyName: req.body.data.userBabyName,
                userBabyAge: req.body.data.userBabyAge,
                userBabyGender: req.body.data.userBabyGender,
                userBabyMonths: req.body.babyMonths,
                userBabyHeight: Number(req.body.data.userBabyHeight),
                userBabyWeight: Number(req.body.data.userBabyWeight),
                userBabyHead: Number(req.body.data.userBabyHead),

                author: {
                    connect: { id: user.id },
                },
            },
        });

        const children = await prisma.children.findMany({
            where: {
                authorId: user.id,
            },
        });

        await prisma.milestones.create({
            data: {
                milestones: milestones[0],

                children: {
                    connect: { id: children[0].id },
                },
            },
        });

        res.end();
    }
};

export default handler;
