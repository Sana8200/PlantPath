/**
 * All Firebase Auth operations go here.
 * Presenters call these functions instead of Firebase directly.
 */

import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    EmailAuthProvider
} from "firebase/auth";
import { auth } from "/src/model/firebaseConfig.js";

/**
 * Sign in with email and password
 */
export async function loginWithEmail(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (err) {
        let errorMessage = "Login failed. Please try again.";

        if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
            errorMessage = "Invalid email or password.";
        } else if (err.code === "auth/too-many-requests") {
            errorMessage = "Too many attempts. Try again later.";
        } else if (err.code === "auth/user-not-found") {
            errorMessage = "No account found with this email.";
        }

        return { success: false, error: errorMessage };
    }
}

/**
 * Create new account with email and password
 */
export async function signupWithEmail(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user };
    } catch (err) {
        let errorMessage = "Signup failed. Please try again.";

        if (err.code === "auth/email-already-in-use") {
            errorMessage = "Email already in use.";
        } else if (err.code === "auth/invalid-email") {
            errorMessage = "Invalid email address.";
        } else if (err.code === "auth/weak-password") {
            errorMessage = "Password must be at least 6 characters.";
        }

        return { success: false, error: errorMessage };
    }
}

/**
 * Sign out current user
 */
export async function logout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (err) {
        return { success: false, error: "Logout failed." };
    }
}

/**
 * Subscribe to auth state changes
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}


export async function sendResetPassEmail(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}