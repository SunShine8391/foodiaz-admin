import * as admin from "firebase-admin";
import { sign, verify } from 'jsonwebtoken';
import { NextResponse } from "next/server";

const secret = process.env.SECRET || 'foodiaz';
let serviceAccount = {};

try {
  serviceAccount = JSON.parse(atob(process.env.SERVICEACCOUNT_ADMIN || '{}'));
} catch {}

export async function GET(request: Request) {
  const url = new URL(request.url || "");
  const email = url.searchParams.get('email');
  const otp = url.searchParams.get('otp');

  if (email === null || otp === null) {
    return NextResponse.json({ success: false, error: "Invalid email or code." });
  }

  // Initialize app

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  const db = admin.firestore();

  // Calc otp & its hash

  const snapshot = await db.collection('users').where('email', '==', email).get();
  if (snapshot.empty) {
    return NextResponse.json({ success: false, error: "The user does not exist." });
  }
  const data = snapshot.docs[0].data();

  // Verify

  try {
    const token = verify(data.otp, secret);

    if (typeof token ==="string") {
      return NextResponse.json({ success: false, error: "Invalid token." });
    }

    if (token.otp === otp) {
      const token = sign({ email }, secret, { expiresIn: 600 });
      return NextResponse.json({ success: true, token });
    } else {
      return NextResponse.json({ success: false, error: "Wrong code." });
    }
  } catch(e) {
    return NextResponse.json({ success: false, error: "Token has expired." });
  }
}
