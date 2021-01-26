import React from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomSideBarMenu from './CustomSideBarMenu';
import NotificationScreen from '../screens/NotificationScreen';
import {Icon} from 'react-native-elements';
import Location from "./location"
 export const AppDrawerNavigator = createDrawerNavigator({
     Home : {
      screen:Location,
         navigationOptions : {
             drawerIcon : <Icon
             name="home"
             />
         }
     },
     
     Notifications : {
         screen : NotificationScreen,
         navigationOptions : {
            drawerIcon : <Icon
            name="bell" type="font-awesome"
            />
           }
    },
},
    {
        contentComponent : CustomSideBarMenu
    },
    { 
        initialRouteName : "Home"
 })