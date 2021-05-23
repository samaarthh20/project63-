import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class HomeScreen extends Component{
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word  : "Loading...",
      lexicalCategory :'',
      definition : ""
    };
  }

  getWord=(word)=>{
    var searchKeyword=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json"
    //console.log(url)
    return fetch(url)
    .then((data)=>{
      if(data.status===200)
      {
        return data.json()
      }
      else
      {
        return null
      }
    })
    .then((response)=>{
        var responseObject = response
        if(responseObject)
        {
          var wordData = responseObject.definitions[0]
  
          var definition=wordData.description
          var lexicalCategory=wordData.wordtype
  
          this.setState({
            "word" : this.state.text, 
            "definition" :definition,
            "lexicalCategory": lexicalCategory     
            
          })
        }
        else
        {
          this.setState({
            "word" : this.state.text, 
            "definition" :"Not Found",
            
          })

        }
    
    })
  }

  render(){
    return(
      <View style={styles.container}>
      <Header
      backgroundColor={'royalblue'}
      centerComponent={{
      text: 'Pocket Dictionary',
      style: { color: 'red', fontSize: 22 },
      }}
      />
      
      <View style={styles.inputBoxContainer}>
        
      <TextInput
      style={styles.inputBox}
      placeholder = 'search word'
      onChangeText={text => {
      this.setState({
      text: text,
      isSearchPressed: false,
      word  : "Loading...",
      lexicalCategory :'',
      examples : [],
      definition : ""
      });
      }}
      value={this.state.text}
      />

      <TouchableOpacity
      style={styles.searchButton}
      onPress={() => {
      this.setState({ isSearchPressed: true });
      this.getWord(this.state.text)
      }}>
      <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.outputContainer}>
      <Text style={{fontSize:20}}>
      {
        this.state.isSearchPressed && this.state.word === "Loading..."
        ? this.state.word
        : ""
        }
      </Text>
      {
        this.state.word !== "Loading..." ?
        (
          <View style={{justifyContent:'center', marginLeft:10,color:'#fff' }}>
          <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
          Word :{" "}
          </Text>
          <Text style={{fontSize:18,color:'#fff' }}>
          {this.state.word}
          </Text>
          </View>
          <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>
          Type :{" "}
          </Text>
          <Text style={{fontSize:18,color:'#fff'}}>
          {this.state.lexicalCategory}
          </Text>
          </View>
          <View style={{flexDirection:'row',flexWrap: 'wrap',color:'#fff'}}>
          <Text style={styles.detailsTitle}>
          Definition :{" "}
          </Text>
          <Text style={{ fontSize:18,color:'#fff'}}>
          {this.state.definition}
          </Text>
          </View>
          </View>
          )
          :null
          }
      
      </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 8,
  },
  inputBoxContainer: {
    flex:0.3,
    alignItems:'center',
    justifyContent:'center'
  },
  inputBox: {
    backgroundColor: 'white',
    marginTop:40,
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
    fontSize: 20,
    fontFamily: 'cursive',
  },
  searchButton: {
    backgroundColor:'pink',
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 3,
    borderRadius: 10,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  searchText:{
    fontSize: 20,
    fontWeight: 'bold',
  },
  outputContainer:{
    flex:0.7,
    alignItems:'center'
  },
  detailsContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  detailsTitle:{
    color:'orange',
    fontSize:20,
    fontWeight:'bold'
  }
});
