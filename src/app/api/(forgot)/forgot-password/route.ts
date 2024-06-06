import { genNum } from "@/lib/utils";
import * as admin from "firebase-admin";
import { sign } from 'jsonwebtoken';
import { NextResponse } from "next/server";

const secret = process.env.SECRET || 'foodiaz';
let serviceAccount = {};

try {
  serviceAccount = JSON.parse(atob(process.env.SERVICEACCOUNT_ADMIN || '{}'));
} catch {}

export async function GET(request: Request) {
  const url = new URL(request.url || "");
  const email = url.searchParams.get('email');

  if (email === null) {
    return NextResponse.error();
  }

  // Initialize app

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  const db = admin.firestore();

  // Calc otp & its hash

  const otp = genNum();
  const hash = sign({ otp }, secret, { expiresIn: 600 });

  // Send email

  await db.collection('mail').add({
    to: email,
    message: {
      html: `Your verification code is ${otp}`,
      subject: 'Foodiaz verification code'
    }
  });

  // Write to DB

  const snapshot = await db.collection('users').where('email', '==', email).get();

  const promises: Promise<unknown>[] = [];
  snapshot.forEach(async (item) => {
    promises.push(item.ref.set({ otp: hash }, { merge: true }));
  });
  await Promise.all(promises);

  return NextResponse.json({ success: true });
}
