import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: {
                params: {
                    scope: 'read:user user:email',
                },
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    pages: {
        signIn: '/Login',
        error: '/Login', // Error code passed in query string as ?error=
    },
    debug: true,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account, profile, email }) {
            // Allow all sign ins
            return true
        },
        async session({ session, user, token }) {
            return session
        },
        async jwt({ token, user, account, profile }) {
            if (user) { 
                token.user = user
            }
            return token
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }