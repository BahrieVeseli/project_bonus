import { router } from "expo-router";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Home() {
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setLoading(false);
      } else {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login"); 
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {userEmail || "User"}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  welcome: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#007AFF", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
