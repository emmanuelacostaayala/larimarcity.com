import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || "larimar_admin_secret_change_in_production_2026"
);

const SESSION_COOKIE = "larimar_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8; // 8 hours

export async function createSession(userId: string): Promise<string> {
    const token = await new SignJWT({ userId })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
        .sign(JWT_SECRET);
    return token;
}

export async function verifySession(token: string) {
    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload as { userId: string };
    } catch {
        return null;
    }
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;
    return verifySession(token);
}

export { SESSION_COOKIE, SESSION_DURATION_SECONDS };
