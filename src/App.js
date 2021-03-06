import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {



  const [repositories, setRepositories] = useState([])




  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`)
    // setRepositories(state => state.map(i => i.id === response.data.id ? response.data : i))

    setRepositories([response.data])
  }


  useEffect(() => {

    api.get('repositories').then(repositories => {
      setRepositories(repositories.data)
    })

  }, [])

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
       {repositories.map(({ id, title, techs, url, likes  }) => {
         return(
          <View key={title} style={styles.repositoryContainer}>
          <Text key={title} style={styles.repository}>{ title }</Text>

          <View style={styles.techsContainer}>
           {techs.map((tech) => {
             return (
              <Text key={tech} style={styles.tech}>
              {tech}
            </Text>
             )
           })}
          </View>

          <View style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
              testID={`repository-likes-${id}`}
            >
              {likes} {likes > 1 ? 'curtidas' : 'curtida'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            testID={`like-button-${id}`}
          >
            <Text style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
         )
       })}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
