import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../../firebase';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';


WebBrowser.maybeCompleteAuthSession();

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


const [request, response, promptAsync] = Google.useAuthRequest({
  expoClientId: "59661906063-9k4aa9facc0p1mvbcsq0kokkd9n233u1.apps.googleusercontent.com",
  iosClientId: "59661906063-9k4aa9facc0p1mvbcsq0kokkd9n233u1.apps.googleusercontent.com",
  androidClientId: "59661906063-9k4aa9facc0p1mvbcsq0kokkd9n233u1.apps.googleusercontent.com",
  webClientId: "59661906063-9k4aa9facc0p1mvbcsq0kokkd9n233u1.apps.googleusercontent.com",

});




  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          router.push("/");
        })
        .catch((err) => setError(err.message));
    }
  }, [response]);

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
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      router.push("/");
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/invalid-credential") {
        setError("Incorrect email or password");
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log In</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>

      <Text style={{ textAlign: "center", marginVertical: 10 }}>or</Text>


      <TouchableOpacity
        style={styles.googleBtn}
        disabled={!request}
        onPress={() => promptAsync()}
      >
        <Image
          source={{
            uri: "https://developers.google.com/identity/images/g-logo.png",
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 25, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginVertical: 5,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    marginTop: 15,
  },
  btnText: { color: "white", textAlign: "center", fontWeight: "600" },
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
  },
  googleIcon: { width: 20, height: 20, marginRight: 8 },
  googleText: { color: "#000", fontWeight: "500" },
  link: { marginTop: 10, textAlign: "center", color: "#007AFF" },
  error: { color: "red", marginTop: 10, textAlign: "center" },
});
