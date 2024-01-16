import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import { compare, hash } from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "jsmith",
        },
        email: {
          label: "email",
          type: "email",
          placeholder: "abc@gmail.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
        action: {
            label: 'action',
            type: 'text'
        }
      },
      async authorize(credentials, req) {
        const { username, email, password, action } = credentials as any;

        if (!email || !password || !action) {
          return null;
        }

        if (action === "signin") {

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            return null;
          }

          const isPasswordValid = await compare(password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id + "",
            email: user.email,
            name: user.username
          };
        } else if (action === "signup") {

            const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (user) {
            return null
          }
          const hashedPassword = await hash(password, 10);

          const newUser = await prisma.user.create({
            data: {
              username: username,
              email: email,
              password: hashedPassword,
            },
          });

          return {
            id: newUser.id + "",
            email: newUser.email,
            name: newUser.username
          };
        }

        return null;
      },
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        profile(profile) {
            return {
                id: profile.sub,
                name: `${profile.given_name} ${profile.family_name}`,
                email: profile.email,
                image: profile.picture,
                role: profile.role ? profile.role : "user",
            }
        }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user, profile, trigger, session }) {

      if(profile) {
        const User = await prisma.user.findFirst({
            where: {
                email: profile.email
            }
        })

        if(!User) {
            const newUser = await prisma.user.create({
                data: {
                    email: profile.email as string,
                    username: profile.name as string,
                    password: '',
                }
            })
            return {...token}
        }
        if(User){
            return {...token}
        }
      }
     
      // console.log("JWT Callback:", { token, user, trigger, session });
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      return { ...token, ...user };
    },
    
    async session({ session, token }) {
      // console.log("Session Callback:", { session, token });
      session.user = {
        id: token.sub,
        email: token.email,
        sub: token.sub,
        name: token.name
      } as typeof session.user;
      return session;
    }
  },
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request', 
    newUser: '/auth/new-user' 
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
