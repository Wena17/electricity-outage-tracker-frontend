import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import {useNavigation} from '@react-navigation/native'

const DrawerScreen = (props) => {
  const navigation =  useNavigation()

  const onEditPressed = () => {
    navigation.navigate('EditProfile')
  }
  return (
    <View style={{flex: 1, height: '90%'}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '#5885AF'}}>
        <ImageBackground
          source={{uri: 'https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg'}}
          style={{padding: 20}}>
          <FontAwesome name="user-circle" size={34} color="gray" />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            User
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Pressable>
              <Text
                style={{
                  color: '#fff',
                  marginRight: 5,
                }}
                onPress={onEditPressed}
              >
                Edit Profile
              </Text>
            </Pressable>
          </View>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 5}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc', marginBottom: '20%'}}>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="share-social-outline" size={22} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerScreen