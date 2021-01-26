import React, { Component } from 'react';
import { StyleSheet, View, FlatList,Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader';
import SwipeableFlatlist from '../components/SwipeableFlatlist';
import db from '../config';

export default class NotificationScreen extends Component{
  constructor(props) {
    super(props);

    this.state = {
      userId :  firebase.auth().currentUser.email,
      allNotifications : []
    };

    this.notificationRef = null
  }

  getNotifications=()=>{
    console.log(this.state.userId)
    this.notificationRef = db.collection("notifications")
    .where("notificationStatus", "==", "Unread")
    //.where("targetedUserId1"||"targetUserId2",'==',this.state.userId)
    //.where("targetedUserId2",'==',this.state.userId)
    //.where("msg","<>","Help Me,I am in Location : Shuzenji")
    .onSnapshot((snapshot)=>{
      var allNotifications =  []
      snapshot.docs.map((doc) =>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        if((notification.targetedUserId1===this.state.userId)||(notification.targetedUserId2===this.state.userId)){
        if((notification.msg!=="Help Me,I am in Location : Shuzenji")&&(notification.msg!=="Help Me,I am in Location : undefined")){
        allNotifications.push(notification)
        }
      }
      });
      
      this.setState({
          allNotifications : allNotifications
      });
    })
  }

  componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount(){
    this.notificationRef()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item,index}) =>{
      return (
        <ListItem
         leftElement={
         <Icon name="gift" type ="font-awesome"
          />} 
          title={"Help Needed " }
           titleStyle={{ 
          color: 'black', fontWeight: 'bold'
         }} 
         subtitle={data.item.msg} 
         bottomDivider
          />
      )
 }


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:0.1}}>
          <MyHeader title={"Notifications"} navigation={this.props.navigation}/>
        </View>
        <View style={{flex:0.9}}>
          {
            this.state.allNotifications.length === 0
            ?(
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>You have no notifications</Text>
              </View>
            )
            :(
              <SwipeableFlatlist allNotifications={this.state.allNotifications}/>
            )
          }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container : {
    flex : 1
  }
})