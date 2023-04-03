import { PrismaClient } from '@prisma/client'

// initiate a prisma client once
// allows us to use the "client" object -> i.e client.user.findAny()

const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client
