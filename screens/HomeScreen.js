import { render } from "react-dom";
import React,{Component} from "react";
import { Text, View, TouchableOpacity, TextInput, Searchbutton,TextComponent, StyleSheet,Constructor} from 'react-native';
export default class HomeScreen extends Component{
  constructor() { 
    super(); 
    this.state = { 
      text: '', 
      isSearchPressed: false, 
      isLoading: false, 
      word : "Loading...", 
      lexicalCategory :'', 
      definition : "" 
    }}
  getWord=(word)=>{
    var searchKeyWord=word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/"+searchKeyWord+".json"
    return fetch(url)
    .then((data)=>{
    if(data.status===200)
    {
        return data.json()
    }
    else{
        return null
    }
    })
    .then((response)=>{
      var responseObject = response
      if(responseObject){
        var wordData = responseObject.definitions[0]
        var definition=wordData.description
        var lexicalCategory=wordData.wordtype
        this.setState({
          "word":this.state.text,
          "definition":definition,
          "lexicalCategory":lexicalCategory
        })
      }
      else{
        this.setState({
          "word" : this.state.text,
        "definition" : "Not Found",
        })
        
      }
    })
  
    }
        

  render() {
        return (
          <View>
             <View style={styles.container}>
<Text style={styles.detailsTitle}>
  word:{""}
</Text>
<Text style={{fontSize:18}}>
  {this.state.word}
</Text>
<Text style={styles.detailsTitle}>
  Type:{""}
</Text>
<Text style={{fontSize:18}}>
  {this.state.lexicalCategory}
</Text>
<Text style={{flexDIrection:'row',flexWrap:"wrap"}}>
  definition:{""}
</Text>
<Text style={{fontSize:18}}>
  {this.state.definition}
</Text>
</View>
          <TextInput
            style={styles.inputBox}
            onChangeText={text=>{
                this.setState({
                    text:text,
                    isSearchPressed:false,
                    word:"Loading...",
                    lexicalCategory:'',
                    examples:[],
                    definition:""
                });
            }}
            
          value={this.state.text}
          />
            <TouchableOpacity style={styles.SearchButton}
            onPress={()=>{
this.setState({isSearchPressed:true});
this.getWord(this.state.text)
            }}>
          <Text>
              submit
              </Text>  
          </TouchableOpacity>
          </View>
        )
            
      }
 
    }
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  inputBoxContainer:{
    flex:0.3,
    aliignItems:'center',
    justifyContent:'center'
  },
  inputBox:{
    width:'80%',
    alignSelf:"center",
    height:40
  }
})