import React,{Component}from 'react';
import {View,Text,TextInput,Modal,KeyboardAvoidingView,StyleSheet,TouchableOpacity,Alert,ScrollView,Image} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Button } from 'react-native';
import { TextComponent } from 'react-native';
import MyHeader from "../components/MyHeader"


export default class RlativeDetails extends Component{
  constructor(props){
    super(props)
    this.state={
      email_Id1:'',
      Name_1:'',
      address_1:'',
      contact_1:'',
      email_Id2:'',
      Name_2:'',
      address_2:'',
      contact_2:'',
      userId:firebase.auth().currentUser.email,
    }
}
    Relatives = () =>{
        
            db.collection('relatives').add({
             Name_1:this.state.Name_1,
              contact_1:this.state.contact_1,
              email_Id1:this.state.email_Id1,
              address_1:this.state.address_1,
              Name_2:this.state.Name_2,
              contact_2:this.state.contact_2,
              email_Id2:this.state.email_Id2,
              address_2:this.state.address_2,
              senderEmail:this.state.userId

            })
            return  alert(
                 'Relative Added Successfully',
             );
          
        }
    render(){
        return(
            <View>
               <MyHeader title="Relatives" navigation ={this.props.navigation}/>
          <Text>
  Enter The First Relative's Details
        </Text>

  <TextInput
               style={styles.formTextInput}
               placeholder ={"Name"}
               maxLength ={16}
               onChangeText={(text)=>{
                 this.setState({
                   Name_1: text
                 })
               }}
               value={this.state.Name_1}
             />
                  <TextInput
               style={styles.formTextInput}
               placeholder ={"Contact"}
               maxLength ={10}
               keyboardType={'numeric'}
               onChangeText={(text)=>{
                 this.setState({
                   contact_1: text
                 })
               }}
               value={this.state.contact_1}
             />
             <TextInput
               style={styles.formTextInput}
               placeholder ={"Address"}
               multiline = {true}
               onChangeText={(text)=>{
                 this.setState({
                   address_1: text
                 })
               }}
               value={this.state.address_1}
             /> 
             <TextInput
               style={styles.formTextInput}
               placeholder ={"Email"}
               keyboardType ={'email-address'}
               onChangeText={(text)=>{
                 this.setState({
                   email_Id1: text
                 })
               }}
               value={this.state.email_Id1}
             />
            <Text>
  Enter The Second Relative's Details
        </Text>

  <TextInput
               style={styles.formTextInput}
               placeholder ={"Name"}
               maxLength ={16}
               onChangeText={(text)=>{
                 this.setState({
                   Name_2: text
                 })
               }}
               value={this.state.Name_2}
             />
                  <TextInput
               style={styles.formTextInput}
               placeholder ={"Contact"}
               maxLength ={10}
               keyboardType={'numeric'}
               onChangeText={(text)=>{
                 this.setState({
                   contact_2: text
                 })
               }}
               value={this.state.contact_2}
             />
             <TextInput
               style={styles.formTextInput}
               placeholder ={"Address"}
               multiline = {true}
               onChangeText={(text)=>{
                 this.setState({
                   address_2: text
                 })
               }}
               value={this.state.address_2}
             /> 
             <TextInput
               style={styles.formTextInput}
               placeholder ={"Email"}
               keyboardType ={'email-address'}
               onChangeText={(text)=>{
                 this.setState({
                   email_Id2: text
                 })
               }}
               value={this.state.email_Id2}
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
     marginTop:5,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:5,
     backgroundColor:"pink"
   },
   registerButtonText:{
     color : "black",
     fontSize:15,
     marginTop:5
   },
   cancelButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:10,
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