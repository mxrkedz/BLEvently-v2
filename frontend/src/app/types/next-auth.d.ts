import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            _id: string;
            name: string;
            email: string;
            image: string;
            token: string;
            role: string;
        } & DefaultSession["user"];

    }
}