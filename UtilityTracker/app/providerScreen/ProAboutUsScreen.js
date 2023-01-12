import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

const AboutUsScreen = () => {
  const navigation = useNavigation();

  const onMenuIconPressed = () => {
    navigation.openDrawer();
  }
  return (
    <SafeAreaView>
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.titleContainer}>          
          <View style={styles.userButton}>
            <Pressable onPress={onMenuIconPressed}>
              <AntDesign name="menufold" size={30} color="gray" />
            </Pressable>
          </View>
          <Text style={styles.title}>About Us</Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txt}>UtilityTracker a mobile application for consumers to notify others of outages in their vicinity, and a crowd-based platform to aggregate notifications in a geographic overview of current outages. Consumer will also be notified of outages near them. </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingTop: 12,
  },
  titleContainer: { 
    flex: 1, 
    flexDirection: 'row',
  },
  userButton: { 
    padding: 10,
  },
  txtContainer: {
    alignSelf: 'center',
    width: '80%',
    margin: 5,
  },  
  txt: {
    fontSize: 24,
    fontWeight: '300',
    paddingTop: 12,
  },
})

export default AboutUsScreen