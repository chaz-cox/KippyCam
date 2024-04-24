import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { storage, db} from './firebaseConfig'
import { ref , getDownloadURL}from "firebase/storage";
import { onValue, ref as dbRef, set } from "firebase/database";

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

      useEffect(() => {
          const queryRef = dbRef(db, 'photo/sent');
          const onDataChange = (snapshot) =>{
              const sent = snapshot.val();
              console.log("sent:",sent);
              if (sent){
                  handleRefresh();
                 set(queryRef, false).then(()=> console.log("sent status updated to false"))
                  .catch((err)=> console.log("ERR when updating sent:",err));
              }
          };
            const listener = onValue(queryRef, onDataChange);
              return ()=>{
                  listener();
              };
          },[]);

          return (
      <View style={styles.container}>
        <Text style={styles.text}>KippyCam</Text>
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

