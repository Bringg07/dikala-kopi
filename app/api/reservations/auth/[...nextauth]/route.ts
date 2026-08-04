import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "admin" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Untuk tahap awal, kita gunakan kredensial statis.
        // Anda wajib mengganti password ini saat aplikasi sudah live.
        if (credentials?.username === "admin" && credentials?.password === "DikalaKopi2024!") {
          return { 
            id: "1", 
            name: "Admin Dikala", 
            email: "admin@dikalakopi.com" 
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login', // Kita arahkan halaman login bawaan ke halaman custom
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // Sesi berlaku 1 hari
  },
  secret: process.env.NEXTAUTH_SECRET, // Pastikan menambahkan variabel ini di file .env
});

export { handler as GET, handler as POST };