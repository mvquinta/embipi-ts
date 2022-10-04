import { PrismaClient } from '@prisma/client'

export const getUserProfile = async (
    id: string | undefined,
    prisma: PrismaClient
) => {
    const userProfile = await prisma.user.findUnique({
        where: {
            id: id,
        },
    })

    return userProfile
}

export const getChild = async (
    id: string | undefined,
    prisma: PrismaClient
) => {
    const child = await prisma.children.findMany({
        where: {
            authorId: id,
        },
    })

    return child
}

export const getMilestones = async (
    id: number | undefined,
    prisma: PrismaClient
) => {
    const milestones = await prisma.milestones.findUnique({
        where: {
            childrenId: id,
        },
        select: {
            milestones: true,
        },
    })

    return milestones
}
