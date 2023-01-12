import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable } from 'react-native';
import React from 'react';

import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

const ProRepairHistoryScreen = () => {
  const navigation = useNavigation();

  const onBackIconPressed = () => {
    navigation.goBack();
  }
  return (
    <SafeAreaView>
      <ScrollView scrollEventThrottle={16}>
        <View style={styles.titleContainer}>          
            <View style={styles.userButton}>
              <Pressable onPress={onBackIconPressed}>
                <Ionicons name="return-up-back" size={30} color="black" />
              </Pressable>
          </View>
          <Text style={styles.title}>Repair History</Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txt}>No Repair History Available</Text>
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

export default ProRepairHistoryScreen