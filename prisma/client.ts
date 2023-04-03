import { PrismaClient } from "@prisma/client";

// initiate a prisma client once
// allows us to use the "client" object -> i.e client.user.findAny()

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

interface CustomNodeJsGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

declare const global: CustomNodeJsGlobal;

const client = global.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") global.prisma = client;

export default client;
