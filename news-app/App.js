import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Button } from 'react-native';

export default function App() {
  const API_KEY = "a70802ae2a884d809f1cdd0658cfcfc9";
  const apiUrl = `https://newsapi.org/v2/everything?q=tesla&from=2022-10-17&sortBy=publishedAt&apiKey=${API_KEY}`
  
  const [fetchingData, setFetchingDataState] = React.useState(true);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        return data.articles;
      })
      .then(articles => {
        setItems(articles);
        setFetchingDataState(false);
      })
      .catch(error => {
        console.error(error);
      });

  }, []);

  if (fetchingData) {
    return <Loading />
  } else {
    return <Item data = { items }/>
  }

}


const Loading = () => {
  return (
    <View style={styles.itemContainer}>
      <Text>
        Loading...
      </Text>
    </View>
  )
}


const Home = ({data}) => {
  return (
    <View style={styles.itemContainer}>
      <FlatList 
        keyExtractor={(item, index) => index.toString()}
        data={ data }
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  )
}


const Item = ({data}) => {
  return (
    <FlatList
      keyExtractor={(item, index) => index.toString()}
      data={ data }
      renderItem={({ item }) => 
        <View style={styles.itemContainer}>
          <Image style={styles.itemImage} source={{ url: item.urlToImage }} />
          <Text style={styles.itemTitle}>
            {item.title}
          </Text>
          <Text style={styles.itemDescription}>
            {item.description}
          </Text>
          <View style={styles.itemBtn}>
            <Button onPress={() => { console.log("Button Pressed!") }} title="Read" />
          </View>
        </View>
      }
    />
  )
}


const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: 0,
    width: '100%',
    padding: 5
  },
  itemImage: {
    height: 200
  },
  itemTitle: {
    textAlign: 'center',
    padding: 20,
    fontSize: 17,
    color: 'black',
    backgroundColor: 'white'
  },
  itemDescription: {
    fontSize: 17,
    padding: 10,
    color: 'black',
    backgroundColor: 'white'
  },
  itemBtn: {
    flexDirection: 'row',
    backgroundColor: 'white'
  }
});