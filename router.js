import React, { Component } from 'react';
import {StackNavigator,NavigationActions} from 'react-navigation';
import LoginOrChat from './src/app';
import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCeA9_v_rhdXS0g7RdMOxVvUxrn45V76h8",
  authDomain: "chat-app-dd78a.firebaseapp.com",
  databaseURL: "https://chat-app-dd78a.firebaseio.com",
  projectId: "chat-app-dd78a",
  storageBucket: "chat-app-dd78a.appspot.com",
  messagingSenderId: "1017335653705"
};
firebase.initializeApp(config);

export default class Router extends Component{
  render(){
    return(
      <Routers/>
    );
  }
}

 const Routers = StackNavigator({
  LoginOrChat:{
    screen:LoginOrChat,
    navigationOptions:{
      header:null,
      gesturesEnabled:false,
    },
  },
  },{
  initialRouteName:'LoginOrChat'
})
