import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  // Hanya jalankan proxy khusus untuk halaman admin dan sub-halamannya
  matcher: ["/admin/:path*"],
};