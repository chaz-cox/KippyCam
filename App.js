import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View, Image } from 'react-native';

  export default function App() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Fetch Image from firebase storage</Text>
        <Image
        style={styles.image}
        source={{
            uri:"https://firebasestorage.googleapis.com/v0/b/esp32-a1f31.appspot.com/o/data%2Fphoto.jpg?alt=media&token=091fe901-e2d1-41a7-a7e7-f970efe03b65"        
            }}
            />
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

