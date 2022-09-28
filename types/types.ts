import { getChild, getUserProfile, getMilestones } from '@/lib/data'
import { Prisma } from '@prisma/client'

// 1: Define a type that includes the relation to `Children`
// const userWithChild = Prisma.validator<Prisma.UserArgs>()({
//     include: { childs: true },
// })

// 2: Define a type that only contains a subset of the scalar fields
// const userPersonalData = Prisma.validator<Prisma.UserArgs>()({
//     select: { email: true, name: true },
// })

// 3: This type will include a user and all their childs
// type UserWithChild = Prisma.UserGetPayload<typeof userWithChild>

type UserChildren = Prisma.PromiseReturnType<typeof getChild>

type UserProfile = Prisma.PromiseReturnType<typeof getUserProfile>

type UserMilestones = Prisma.PromiseReturnType<typeof getMilestones>

export type { UserChildren, UserProfile, UserMilestones }
