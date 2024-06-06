import * as admin from "firebase-admin";
import { getAuth } from 'firebase-admin/auth';
import { verify } from 'jsonwebtoken';
import { NextResponse } from "next/server";

const secret = process.env.SECRET || 'foodiaz';
let serviceAccount = {};

try {
  serviceAccount = JSON.parse(atob(process.env.SERVICEACCOUNT_ADMIN || '{}'));
} catch {}

export async function GET(request: Request) {
  const url = new URL(request.url || "");
  const token = url.searchParams.get('token');
  const password = url.searchParams.get('pwd');

  // Initialize app

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  // Verification

  if (!token || !password) {
    return NextResponse.json({ success: false, error: "Invalid token or password." });
  }

  try {
    const decode = verify(token, secret);

    if (typeof decode === "string" || !decode.email) {
      return NextResponse.json({ success: false, error: "Invalid token." });
    }

    const auth = getAuth(admin.app());
    const user = await auth.getUserByEmail(decode.email);
    await auth.updateUser(user.uid, { password });
  } catch {
    return NextResponse.json({ success: false, error: "Can't update user password." });
  }

  return NextResponse.json({ success: true });
}
