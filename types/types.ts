import { getChild, getUserProfile, getMilestones, getPercentileValues } from '@/lib/data';
import { Prisma } from '@prisma/client';

/* 1: Define a type that includes the relation to `Children`
const userWithChild = Prisma.validator<Prisma.UserArgs>()({
    include: { childs: true },
})

2: Define a type that only contains a subset of the scalar fields
const userPersonalData = Prisma.validator<Prisma.UserArgs>()({
    select: { email: true, name: true },
})

3: This type will include a user and all their childs
type UserWithChild = Prisma.UserGetPayload<typeof userWithChild> */

type UserChildren = Prisma.PromiseReturnType<typeof getChild>;

type UserProfile = Prisma.PromiseReturnType<typeof getUserProfile>;

type UserMilestones = Prisma.PromiseReturnType<typeof getMilestones>;

type PercentileValues = Prisma.PromiseReturnType<typeof getPercentileValues>;

type FormValues = {
    userName: string;
    lastName: string;
    email: string;
    userBabyName: string;
    userBabyGender: string;
    userBabyAge: Date | string;
    userBabyHeight: Prisma.Decimal | number;
    userBabyWeight: Prisma.Decimal | number;
    userBabyHead: Prisma.Decimal | number;
};

type CheckedGender = {
    male: boolean;
    female: boolean;
};

interface PercentileCurves {
    id: number;
    gender: string;
    data: {
        height: {
            curve0: Array<number>;
            curve3: Array<number>;
            curve15: Array<number>;
            curve50: Array<number>;
            curve85: Array<number>;
            curve97: Array<number>;
            curve99: Array<number>;
        };
        weight: {
            curve0: Array<number>;
            curve3: Array<number>;
            curve15: Array<number>;
            curve50: Array<number>;
            curve85: Array<number>;
            curve97: Array<number>;
            curve99: Array<number>;
        };
        head: {
            curve0: Array<number>;
            curve3: Array<number>;
            curve15: Array<number>;
            curve50: Array<number>;
            curve85: Array<number>;
            curve97: Array<number>;
            curve99: Array<number>;
        };
    };
}

interface ActiveMilestone {
    id: number;
    date: null | string;
    text: string;
    type: string;
    status: boolean;
}

interface MilestonesDone {
    date: string;
    id: number;
    status: boolean;
    text: string;
    type: string;
}

export type {
    UserChildren,
    UserProfile,
    UserMilestones,
    PercentileValues,
    FormValues,
    CheckedGender,
    PercentileCurves,
    ActiveMilestone,
    MilestonesDone,
};
