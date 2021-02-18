import React, { Component } from "react";
import { StyleSheet, View, FlatList, Text, Image } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import firebase from "firebase";
import MyHeader from "../components/MyHeader";
import SwipeableFlatlist from "../components/SwipeableFlatlist";
import db from "../config";

export default class NotificationScreen extends Component {
  constructor() {
    super();

    this.state = {
      userId: firebase.auth().currentUser.email,
      allNotifications: []
    };

    this.notificationRef = null;
  }

  getNotifications = () => {
    this.notificationRef = db.collection("notifications")
      .where("notificationStatus", "==", "Unread")
        .onSnapshot(snapshot => {
        var allNotifications = [];
        snapshot.docs.map(doc => {
          var notification = doc.data();
          notification["doc_id"] = doc.id;
          if((notification.targetedUserId1===this.state.userId)||(notification.targetedUserId2===this.state.userId)){
              if((notification.msg!=="Help Me,I am in Location  Shuzenji")&&(notification.msg!=="Help Me,I am in Location  undefined")){
                allNotifications.push(notification);
              }
          }
         
        });
        this.setState({
          allNotifications: allNotifications
        });
      });
  };

  componentDidMount() {
    this.getNotifications();
  }

  componentWillUnmount() {
    this.notificationRef();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        leftElement={<Icon name="gift" type="font-awesome" color="#696969" />}
        title={"Help_Needed"}
        titleStyle={styles.LiTitle}
        subtitle={item.msg}
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.13 }}>
        <MyHeader title={"Notifications"} navigation={this.props.navigation}/>
        </View>
        <View style={{ flex: 0.8 }}>
          {this.state.allNotifications.length === 0 ? (
            <View style={styles.imageView}>
              
              <Text style={{ fontSize: 25 }}>You have no notifications</Text>
            </View>
          ) : (
            <SwipeableFlatlist allNotifications={this.state.allNotifications} />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#deeeed"
  },
  imageView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  LiTitle: {
    color: "black",
    fontWeight: "bold"
  }
});
