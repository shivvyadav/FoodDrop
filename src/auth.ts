import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import connectDB from './lib/db';
import User from './models/User';
import bcrypt from 'bcryptjs';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials: any): Promise<any> {
        try {
          await connectDB();
          const { email, password } = credentials;

          const user = await User.findOne({ email });
          if (!user) {
            throw new Error('User not found');
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            role: user.role,
          };
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.role = user.role;
      }
      if (trigger === 'update') {
        token.role = session.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET!,
});
