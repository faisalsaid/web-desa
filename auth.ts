import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';

import prisma from './lib/prisma';
import { loginSchema } from './app/auth/_lib/auth.zod';
import { compareSync } from 'bcrypt-ts';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Refresh the token daily.
  },
  providers: [
    Credentials({
      credentials: {},

      authorize: async (credentials) => {
        // console.log('authCredentials ==>>', credentials);

        // validate crendetials input
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        // desctruction credentials
        const { email, password } = validatedFields.data;

        // check user exist and have password
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error('No user found');
        }

        // compare hashed password
        const passwordMatch = compareSync(password, user.hashedPassword);

        if (!passwordMatch) {
          return null;
        }

        // remove hashPassord before send
        const { hashedPassword, ...cleanUser } = user;
        // console.log('authCredentials ==>>', cleanUser);

        return cleanUser;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        // If the user already exists and there's no linked Google account, link it.
        if (existingUser) {
          const existingGoogleAccount = await prisma.account.findFirst({
            where: {
              provider: 'google',
              providerAccountId: account.providerAccountId,
            },
          });

          if (!existingGoogleAccount) {
            await prisma.account.create({
              data: {
                userId: existingUser.id,
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                id_token: account.id_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
              },
            });
          }

          // ✅ Update the image if it doesn't exist yet.
          if (!existingUser.image && profile?.picture) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { image: profile.picture },
            });
          }
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
});
