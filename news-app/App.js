// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [fetchingData, setFetchingDataState] = React.useState(true);
  setTimeout(() => {
    setFetchingDataState(false)
  }, 1000);

  if (fetchingData) {
    return <Loading />
  } else {
    return <Home />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


const Home = () => {
  return (
    <View style={styles.container}>
      <Text>
        This will be the home screen of the application.
      </Text>
    </View>
  )
}


const Loading = () => {
  return (
    <View style={styles.container}>
      <Text>
        Loading...
      </Text>
    </View>
  )
}