import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

type clientType = {
  clientId: string | undefined;
  clientSecret: string | undefined;
}

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
    ],
    pages: {
        signIn : "/auth/signin"
  },
    
  // callbacks: {
  //   async session({ session, token, user }) {
      
  //     session.user.userid = token.sub
      
  //     return session
      
  //     }
  //   }
};

export default NextAuth(authOptions);