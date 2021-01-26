import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView,
  Image,Linking,Platform,
  Button} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';

export default class Location extends Component{
    constructor(){
        super();
        this.state={
            longitude:"",
            lattitude:"",
            weather:"",
            contact1:"",
            contact2:"",
            userId:firebase.auth().currentUser.email,
        }
    }

   
    

getLocation=()=>{
    var lattitude
    navigator.geolocation.getCurrentPosition((position)=>{
        this.setState({
            lattitude:position.coords.latitude,
            longitude:position.coords.longitude,
        })
    })
}
componentDidMount(){
    this.getLocation()
}

Weather=async()=>{
    var url="https://fcc-weather-api.glitch.me/api/current?lat="+this.state.lattitude+"&lon="+this.state.longitude
    return fetch(url)
    .then(response=>response.json())
    .then(responseJson=>{
      this.setState({
        weather:responseJson
      })
    })
    .catch(
      error=>{
        console.error(error)
      }
    )
  }

  addNotification=()=>{
      db.collection("relatives").where("senderEmail" ,"==",this.state.userId).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
        var data = doc.data()
        this.setState({
            contact1:data.contact_firstrelative,
            contact2:data.contact_secondrelative
        })
       
        db.collection("notifications").add({
            msg:"Help Me,I am in Location"+" : "+this.state.weather.name,
            notificationStatus:"Unread",
            date:firebase.firestore.FieldValue.serverTimestamp(),
            targetedUserId1:data.email_id_firstrelative,
            targetedUserId2:data.email_id_secondrelative,
            senderId:data.senderEmail
        })
        });
      })
  }
 dialCall = (number) => {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
 };
render(){
    return(
        <View style={{marginTop:100}}>
          <MyHeader title="Find Out My Location" navigation ={this.props.navigation}/>
          <Text>
              {this.state.lattitude}
          </Text>
          <Text>
               {this.state.longitude}
          </Text>
           <Button 
           title="Get My Location"
           onPress={()=>{
               this.Weather(),
                this.addNotification()
            }}
           />
          <Text>
               {this.state.weather.name}
           </Text>
           <TouchableOpacity
                   style={{
                   height: 30,
                   width: 200,
                   backgroundColor: "#329df4",
                   alignItems: "center",
                   justifyContent: "center",
                   borderRadius: 5,
                   marginTop:100,
                   marginLeft:100
                   }}
                 onPress={()=>{this.dialCall(this.state.contact1)}}
                >
                <Text>Make a Phone Call To My First Relative </Text>
                </TouchableOpacity>
                <TouchableOpacity
                   style={{
                   height: 30,
                   width: 200,
                   backgroundColor: "#329df4",
                   alignItems: "center",
                   justifyContent: "center",
                   borderRadius: 5,
                   marginTop:100,
                   marginLeft:100
                   }}
                 onPress={()=>{this.dialCall(this.state.contact2)}}
                >
                <Text>Make a Phone Call To My second Relative </Text>
                </TouchableOpacity>
        </View>
    )
}

}
const styles = StyleSheet.create({
  
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});