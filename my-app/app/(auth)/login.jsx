import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase.js';

import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext'; 
import { doSignWithGoogle, doSignwithEmailAndPassword } from '../firebase/auth'; // ✅ import i saktë

const Login = () => {
    const { userLoggedIn } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSigningIn, setIsSigningIn] = useState(false);

    const validateInputs = () => {
        if (email.trim() === "" || password.trim() === "") {
            setError("Both fields are required");
            return false;
        }

        const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
        if (!emailRegex.test(email)) {
            setError("Email is not valid");
            return false;
        }

        setError("");
        return true;
    }

    const handleLogin = async () => {
        if (!validateInputs()) return;
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setLoading(false);
            router.push("/"); // ✅ navigon tek faqja kryesore
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                setError("Incorrect email or password");
            } else {
                setError(error.message);
            }
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (isSigningIn) return;
        setIsSigningIn(true);

        try {
            await doSignWithGoogle();
        } catch (err) {
            setIsSigningIn(false);
        }
    };

    return (
        <View style={styles.container}>
            {userLoggedIn && router.push("/")} {/* ✅ Nëse përdoruesi është loguar */}

            <Text style={styles.title}>Log In</Text>

            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                style={styles.input}
            />

            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.btn} onPress={handleLogin}>
                <Text style={styles.btnText}>{loading ? "Logging in..." : "Login"}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/register")}>
                <Text style={styles.link}>Don't have an account? Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, { marginTop: 10 }]} onPress={handleGoogleSignIn}>
                <Text style={styles.btnText}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 25, textAlign: "center" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        marginVertical: 5,
        borderRadius: 8
    },
    btn: {
        backgroundColor: "#007AFF",
        padding: 14,
        borderRadius: 8,
        marginTop: 15
    },
    btnText: { color: "white", textAlign: "center", fontWeight: "600" },
    link: { marginTop: 10, textAlign: "center", color: "#007AFF" },
    error: { color: "red", marginTop: 10, textAlign: "center" },
});
