import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const ADMIN_USER = "admin";
    const ADMIN_PASS = "dikalakopi2026";

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      // Tambahkan 'await' di sini karena cookies() mengembalikan Promise
      const cookieStore = await cookies();
      
      cookieStore.set("admin_token", "logged_in_secure_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, 
        path: "/",
      });

      return NextResponse.json({ success: true, message: "Login berhasil!" });
    }

    return NextResponse.json(
      { success: false, message: "Username atau password salah!" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}