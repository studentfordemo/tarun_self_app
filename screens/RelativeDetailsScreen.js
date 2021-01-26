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
  Image} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Button } from 'react-native';
import MyHeader from '../components/MyHeader';


export default class RlativeDetails extends Component{
  constructor(){
    super();
    this.state={
      emailId_firstrelative:'',
      Name_firstrelative:'',
      address_firstrelative:'',
      contact_firstrelative:'',
      emailId_secondrelative:'',
      Name_secondrelative:'',
      address_secondrelative:'',
      contact_secondrelative:'',
      userId:firebase.auth().currentUser.email,
    }
}
    Relatives = () =>{
        
            db.collection('relatives').add({
             name_firstrelative:this.state.Name_firstrelative,
              contact_firstrelative:this.state.contact_firstrelative,
              email_id_firstrelative:this.state.emailId_firstrelative,
              address_firstrelative:this.state.address_firstrelative,
              name_secondrelative:this.state.Name_secondrelative,
              contact_secondrelative:this.state.contact_secondrelative,
              email_id_secondrelative:this.state.emailId_secondrelative,
              address_secondrelative:this.state.address_secondrelative,
              senderEmail:this.state.userId
            })
            return  alert(
                 'Relatives Details Added Successfully',
             );
          
        }
    render(){
        return(
            <View>
               <MyHeader title="Relative Details" navigation ={this.props.navigation}/>
              <Text> Enter first relative details</Text>
                    <TextInput
               style={styles.formTextInput}
               placeholder ={" Enter Name"}
               maxLength ={16}
               onChangeText={(text)=>{
                 this.setState({
                  Name_firstrelative: text
                 })
               }}
               value={this.state.name}
             />
                  <TextInput
               style={styles.formTextInput}
               placeholder ={"Contact"}
               maxLength ={10}
               keyboardType={'numeric'}
               onChangeText={(text)=>{
                 this.setState({
                  contact_firstrelative: text
                 })
               }}
               value={this.state.contact}
             />
             <TextInput
               style={styles.formTextInput}
               placeholder ={"Address"}
               multiline = {true}
               onChangeText={(text)=>{
                 this.setState({
                   address_firstrelative: text
                 })
               }}
               value={this.state.address}
             /> 
             <TextInput
               style={styles.formTextInput}
               placeholder ={"Email"}
               keyboardType ={'email-address'}
               onChangeText={(text)=>{
                 this.setState({
                   emailId_firstrelative: text
                 })
               }}
               value={this.state.emailId}
             />
            <Text> Enter second relative details</Text>
            <TextInput
               style={styles.formTextInput}
               placeholder ={" Enter Name"}
               maxLength ={16}
               onChangeText={(text)=>{
                 this.setState({
                   Name_secondrelative: text
                 })
               }}
               value={this.state.name}
             />
                  <TextInput
               style={styles.formTextInput}
               placeholder ={"Contact"}
               maxLength ={10}
               keyboardType={'numeric'}
               onChangeText={(text)=>{
                 this.setState({
                   contact_secondrelative: text
                 })
               }}
               value={this.state.contact}
             />
             <TextInput
               style={styles.formTextInput}
               placeholder ={"Address"}
               multiline = {true}
               onChangeText={(text)=>{
                 this.setState({
                   address_secondrelative: text
                 })
               }}
               value={this.state.address}
             /> 
             <TextInput
               style={styles.formTextInput}
               placeholder ={"Email"}
               keyboardType ={'email-address'}
               onChangeText={(text)=>{
                 this.setState({
                   emailId_secondrelative: text
                 })
               }}
               value={this.state.emailId}
             />
             <View style={styles.modalBackButton}>
               <TouchableOpacity
                 style={styles.registerButton}
                 onPress={()=>{
                     this.Relatives()
                   this.props.navigation.navigate("Location")
                 }
                   
                 }
               >
                 
               <Text style={styles.registerButtonText}>Confrim</Text>
               </TouchableOpacity>
               <Text>
                 If Already Registered then press the below button
               </Text>
               <Button
               title="Exit"
               onPress={()=>{
                 this.props.navigation.navigate("Location")
               }}
               />
             </View>
            </View>
        )
    }
     
        
  }

  const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#89CFF0',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#FF00FF'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30,
     backgroundColor:"pink"
   },
   registerButtonText:{
     color : "black",
     fontSize:15
   },
   cancelButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30,
    backgroundColor:"pink"
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     color:'#b19cd9',
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'black',
     fontWeight:'200',
     fontSize:20
   }
  })