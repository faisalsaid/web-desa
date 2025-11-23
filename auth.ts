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
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 10 * 60,
  },

  providers: [
    Credentials({
      credentials: {},
      authorize: async (credentials) => {
        const validated = loginSchema.safeParse(credentials);
        if (!validated.success) return null;

        const { email, password } = validated.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.hashedPassword) throw new Error('No user found');

        const match = compareSync(password, user.hashedPassword);
        if (!match) return null;

        const { hashedPassword, ...cleanUser } = user;
        return cleanUser;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // Google login linking logic
      if (account?.provider === 'google') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (existingUser) {
          const googleAcc = await prisma.account.findFirst({
            where: {
              provider: 'google',
              providerAccountId: account.providerAccountId,
            },
          });

          if (!googleAcc) {
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

    // ==============================
    // 🔐 JWT AUTO INVALIDATION
    // ==============================
    async jwt({ token, user }) {
      // Saat login
      if (user) {
        token.role = user.role;
        return token;
      }

      // Cek apakah user masih ada di database
      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub! },
        select: { id: true },
      });

      if (!existingUser) {
        token.deleted = true; // ditandai invalid
      }

      return token;
    },

    async session({ session, token }) {
      if (token.deleted) {
        // session tetap dikembalikan, tapi user dihapus
        session.user = null as any;
        return session;
      }

      session.user.id = token.sub!;
      session.user.role = token.role;
      return session;
    },
  },
});
