import { View, Text, ScrollView, StyleSheet, SafeAreaView, Pressable, Button, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import CustomImageView from '../components/CustomImageView';
import CustomButton from '../components/CustomButton';

const HomeScreen = () => {

  const navigation = useNavigation();
  const onMenuIconPressed = () => {
    navigation.openDrawer();
  }
  
  const handleAddModal = () => {
    navigation.navigate('AddScheduleOutage');
  }
  const handleViewModal = () => {
    //TODO Get pinned location in the database and pass as a parameter to view modal
    navigation.navigate('ProviderHome');
  }
  
  return (
    <SafeAreaView>
      <ScrollView scrollEventThrottle={16}  >
        <View>
          <View style={styles.userButton}>
            <Pressable onPress={onMenuIconPressed}>
              <AntDesign name="menufold" size={30} color="gray" />
            </Pressable>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Posted scheduled outages</Text>
          </View>
          <View style={styles.imgContainer}>
            <ScrollView 
              horizontal={true} 
              showsHorizontalScrollIndicator={false}
            >
              <CustomImageView 
                imgSource={{uri:'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg'}} description='Ongoing cabling'
              />
              <CustomImageView 
                imgSource={{uri: 'https://images.pexels.com/photos/1906658/pexels-photo-1906658.jpeg'}} description='Maintenance'
              />
              <CustomImageView 
              imgSource={{uri:'https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg'}} description='Ongoing cabling'
              />              
              <CustomImageView 
                description='Ongoing cabling'
              />
            </ScrollView>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <CustomButton 
            text='New Schedule Power Interruption' 
            onPress={handleAddModal} 
          />      
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  btnContainer: {
    flex: 1,
    marginTop: '20%',
    width: '85%',
    alignSelf: 'center'
  },
  imgContainer: {
    height:160,
    marginTop: 20,
    marginBottom: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingLeft: 10
  },
  userButton: {
    alignSelf: 'flex-start',    
    padding: 10,
  },

})

export default HomeScreen;