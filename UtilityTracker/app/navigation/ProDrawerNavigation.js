import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../providerScreen/ProHomeScreen';
import RepairHistoryScreen from '../providerScreen/ProRepairHistoryScreen';
import FeedbackScreen from '../providerScreen/ProFeedbackScreen';
import AboutUsScreen from '../providerScreen/ProAboutUsScreen';
import ProDrawerScreen from '../providerScreen/ProDrawerScreen';
import ProSignout from '../providerScreen/ProSignout'

import { Ionicons, Octicons, MaterialIcons, AntDesign } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const ProDrawerNavigation = (props) => {
  return (
    <Drawer.Navigator
      drawerContent={prop => <ProDrawerScreen {...prop
      
      } />}
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
        {(p) => <HomeScreen /> }
      </Drawer.Screen> 
      <Drawer.Screen
        name="Repair History"
        component={RepairHistoryScreen}
        options={{
          drawerIcon: ({color}) => (
            <Octicons name="history" size={20} color={color} />
          ),
        }}
      />
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
        {(p) => <ProSignout model={props.model} onUpdate={props.onUpdate} /> }
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default ProDrawerNavigation;