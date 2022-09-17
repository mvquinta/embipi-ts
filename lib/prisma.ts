// import { PrismaClient } from '@prisma/client'

// let prisma: PrismaClient

// let global: any = {}

// prisma = global.prisma || new PrismaClient()

// if (process.env.NODE_ENV === 'development') global.prisma = prisma

// export default prisma

//
// Code sugested by prisma documentation
//https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
//

import { PrismaClient } from '@prisma/client'

declare global {
    // allow global `var` declarations
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

export const prisma =
    global.prisma ||
    new PrismaClient({
        log: ['query'],
    })

if (process.env.NODE_ENV !== 'production') global.prisma = prisma
