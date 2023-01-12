import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import OutageHistoryScreen from '../screens/OutageHistoryScreen';
import AlternativePowerSource from '../screens/AlternativePowerSource';
import ReportOutage from '../screens/ReportOutage';
import FeedbackScreen from '../screens/FeedbackScreen';
import AboutUsScreen from '../screens/AboutUsScreen';
import DrawerScreen from '../screens/DrawerScreen';
import Signout from '../screens/Signout';

import { Ionicons, Octicons, FontAwesome5, MaterialIcons, AntDesign } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const DrawerNavigation = (props) => {
  
  return (
    <Drawer.Navigator
      drawerContent={prop => <DrawerScreen {...prop} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#5885AF',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      >
        {(p) => <HomeScreen model={props.model} onUpdate={props.onUpdate} /> }
      </Drawer.Screen>      
      <Drawer.Screen
        name="Alternative Power Source"
        options={{
          drawerIcon: ({color}) => (
            <FontAwesome5 name="superpowers" size={22} color={color} />
          ),
        }}
      >
        {(p) => <AlternativePowerSource model={props.model} onUpdate={props.onUpdate} /> }
      </Drawer.Screen> 
      <Drawer.Screen
        name="Outage History"
        options={{
          drawerIcon: ({color}) => (
            <Octicons name="history" size={20} color={color} />
          ),
        }}
      >
        {(p) => <OutageHistoryScreen model={props.model} onUpdate={props.onUpdate} /> }
      </Drawer.Screen> 
      <Drawer.Screen
        name="Report Outage"
        options={{
          drawerIcon: ({color}) => (
            <Octicons name="report" size={20} color={color} />
          ),
        }}
      >
        {(p) => <ReportOutage model={props.model} onUpdate={props.onUpdate} /> }
      </Drawer.Screen>
      <Drawer.Screen
        name="Feedback"
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons  name="dynamic-feed" size={25} color={color} />
          ),
        }}
      >
        {(p) => <FeedbackScreen model={props.model} onUpdate={props.onUpdate} /> }
      </Drawer.Screen>
      <Drawer.Screen
        name="About us"
        component={AboutUsScreen}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons  name="info-outline" size={28} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Signout"
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="logout" size={22} color={color} />
          ),
        }}
      >
        {(p) => <Signout model={props.model} onUpdate={props.onUpdate} /> }
      </Drawer.Screen> 
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;