import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { storage } from './firebaseConfig'
import { getStorage, ref , getDownloadURL}from "firebase/storage";

  export default function App() {
    const [source, setSource] = useState(null);
    const handleRefresh = () =>{
        const photoRef = ref(storage, "data/photo.jpg");
        getDownloadURL(photoRef).then((url) =>{
                  console.log("URL:",url);
                  setSource({uri: url});
              }).catch((err)=>{
                  console.log(err);
              });
    };

          return (
      <View style={styles.container}>
        <Text style={styles.text}>Fetch Image from firebase storage</Text>
        <Image
        style={styles.image}
        source={source}
            />
        <Button title="Refesh" onPress={handleRefresh} />
        <StatusBar style="auto" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
      image:{
          width: 400,
          height: 300,
          resizeMode: 'contain',
          borderRadius: 50,
      },
      text:{
          marginBottom: 15,
          fontWeight: 'bold',
          fontSize: 20,
      },
  });

