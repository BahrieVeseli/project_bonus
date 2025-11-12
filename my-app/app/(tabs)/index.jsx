import { router } from "expo-router";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {auth} from "../../firebase"
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const [userEmail, setUserEmail] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() =>{

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email)
        setLoading(false)
      } else {
        router.replace("/login");
      }
    })

    return () => unsubscribe()

  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
      <Text style={styles.welcome}>Loading...</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome {userEmail || "User"}</Text>
     

      <TouchableOpacity
        onPress={() => router.push("/add-task")}
        style={{
          backgroundColor: "#007AFF",
          padding: 10,
          borderRadius: 8,
          marginTop: 20,
          alignItems: "center",
          height: 40
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Add New Task
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
 container: { flex: 1, padding: 20, justifyContent: "center", alignItems: "center" },
  welcome: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
});