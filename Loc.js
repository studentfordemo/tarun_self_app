import React, { Component } from "react";
import { render } from "react-dom";
import {View,Text,Button} from "react-native"
import db from '../config';
import firebase from 'firebase';


export default class Location extends Component {
  constructor(){
    super()
    this.state={
      weather:"",
      lat:"",
      long:"",
      userId :  firebase.auth().currentUser.email
    }
  }
  getlocation=()=>{
    var latitude;
    navigator.geolocation.getCurrentPosition((position)=> {
    this.setState({lat:position.coords.latitude,
    long:position.coords.longitude})
     
    });
  }
 componentDidMount(){
    this.getlocation()
   
  }
  getWeather = async () => {
    
   console.log("checking"+this.state.lat)
      var url = 'https://fcc-weather-api.glitch.me/api/current?lat='+this.state.lat+'&lon='+this.state.long;
    return fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          weather: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  addNotification=()=>{
   db.collection("relatives_details")
    .where("senderId","==", this.state.userId)
    .get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
      var message = ""
      var docId=doc.id
      var targetId=doc.data()

      db.collection("all_notifications").add({
          "message": "I need your help",
          "notification_status" : "unread",
          "date"                : firebase.firestore.FieldValue.serverTimestamp(),
          "location":this.state.weather.name,
          "targeted_user_id":targetId.email_id,
          "documnetID":docId
        })
      });
    })
  }
   
  render(){
    return(
      <View>
      <Text>{this.state.lat}</Text>
       <Text>{this.state.long}</Text>
       <Button title="weather" onPress={()=>{
         this.getWeather()
         this.addNotification()
       }}/>
       <Text>
            {this.state.weather.name}
            </Text>

      </View>
    )
  }
}