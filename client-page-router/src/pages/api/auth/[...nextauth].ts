import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'credential',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (credentials?.email !== '' && credentials?.password !== '') {
          const { email, password } = credentials!;
          const res = await fetch(process.env.BACKEND_URL! + '/auth/signin', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
          });
          console.log(res.ok);
          if (res.status === 401) {
            return false;
          } else {
            const data = await res.json();
            return data.user;
          }
        } else {
          return false;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  theme: {
    colorScheme: 'light' as 'light',
    logo: 'https://1000logos.net/wp-content/uploads/2023/02/ChatGPT-Logo.png', // Absolute URL to image
  },

  callbacks: {
    // async session({ session, token }) {
    //   console.log(JSON.stringify(token));
    //   return session;
    // },
    // async jwt({ token, account }) {
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
    async signIn({ user, account }) {
      if (account?.type === 'oauth') {
        const { name, image, email } = user!;
        const res = await fetch(process.env.BACKEND_URL! + '/auth/signup', {
          method: 'POST',
          body: JSON.stringify({ name, password: 'unimportant', image, email }),
        });
      }
      return true;
    },
  },
} satisfies AuthOptions;

export default NextAuth(authOptions);
