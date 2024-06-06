"use client"

import { firebaseErrorMessage } from "@/config/message";
import {
  User,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword
} from "firebase/auth";
import { auth } from "./firebase";

export async function sendResetPasswordCode(email: string) {
  return await fetch(`/api/forgot-password?email=${email}`);
}

export async function verifyPasswordResetOtp(email: string, otp: string) {
  return await fetch(`/api/verify-otp?email=${email}&otp=${otp}`).then(res => res.json());
}

export async function resetPasswordUsingToken(token: string, newPassword: string) {
  return await fetch(`/api/reset-password?token=${token}&pwd=${newPassword}`).then(res => res.json());
}

export const signInUserWithEmailAndPass = (email: string, password: string) =>
  new Promise<User>((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { user } = userCredential;
        // console.log(user);
        resolve(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        let userDisplayMessage = error.message;
        switch (errorCode) {
          case "auth/user-not-found":
            userDisplayMessage =
              "Your email or password is incorrect. Please try again. Or try with your username.";
            break;
          case "auth/wrong-password":
            userDisplayMessage =
              "Your email or password is incorrect. Please try again. Or try with your username.";
            break;
          case 'auth/multi-factor-auth-required':

            break;
          default:
            userDisplayMessage =
              firebaseErrorMessage[errorCode] || error.message;
            break;
        }
        const errorReasons = {
          errorCode,
          userDisplayMessage,
        };
        reject(errorReasons);
      });
  });

export const signOut = () => auth.signOut();

export const changePassword = (
  email: string,
  currentPassword: string,
  newPassword: string
) =>
  new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, currentPassword)
      .then((userCredential) => {
        updatePassword(userCredential.user, newPassword)
          .then(async () => {
            // console.log(user);
            await signOut();
            resolve(null);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        const errorCode = error.code;
        let userDisplayMessage = error.message;
        switch (errorCode) {
          case "auth/user-not-found":
            userDisplayMessage =
              "Your password is incorrect. Please try again.";
            break;
          case "auth/wrong-password":
            userDisplayMessage =
              "Your password is incorrect. Please try again.";
            break;
          default:
            userDisplayMessage =
              firebaseErrorMessage[errorCode] || error.message;
            break;
        }
        const errorReasons = {
          errorCode,
          userDisplayMessage,
        };
        reject(errorReasons);
      });
  });

export const updateEmailAddress = (user: User, newEmail: string) =>
  new Promise((resolve, reject) => {
    updateEmail(user, newEmail)
      .then(() => {
        resolve(null);
      })
      .catch((error) => {
        const errorCode = error.code;
        let userDisplayMessage = error.message;
        switch (errorCode) {
          case "auth/user-not-found":
            userDisplayMessage =
              "Your email or password is incorrect. Please try again. Or try with your username.";
            break;
          case "auth/wrong-password":
            userDisplayMessage =
              "Your email or password is incorrect. Please try again. Or try with your username.";
            break;
          default:
            userDisplayMessage =
              firebaseErrorMessage[errorCode] || error.message;
            break;
        }
        const errorReasons = {
          errorCode,
          userDisplayMessage,
        };
        reject(errorReasons);
      });
  });
