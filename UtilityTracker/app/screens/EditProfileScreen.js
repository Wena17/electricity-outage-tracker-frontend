import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, Text, ScrollView, Pressable} from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import { useTogglePasswordVisibility } from '../components/UseTogglePasswordVisibility';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

const EditProfileScreen = (props) => {

  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('First Name');
  const [lastName, setLastName] = useState('Last Name');
  const [phoneNo, setPhoneNo] = useState('0920335502');

  const onBackIconPressed = () => {
    navigation.navigate('Home1', {screen: 'Home2'});
  }

  useEffect(() => {
    fetch('https://outage-monitor.azurewebsites.net/api/v1/users/' + props.model.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.model.authToken,
      }
    })
    .then((response) => response.json())
    .then((json) =>{
      console.log("User: " + JSON.stringify(json));
      setFirstName(json.firstName)
      setLastName(json.lastName)
      setPhoneNo(json.phoneNo)
    })
    .catch((error) => {
      console.error(error);
    })
  }, [])

  const onUpdatePressed = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to update your profile",
      [
        {
          text: "Cancel",
          onPress: () => {
          setAddModalVisible(() => !isAddModalVisible)
          navigation.navigate('Home1', {screen: 'Home2'})
          }
        },
        { 
          text: "OK", onPress: () => {
            fetch('https://outage-monitor.azurewebsites.net/api/v1/users/' + props.model.id, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.model.authToken,
              },
              body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                phoneNo: phoneNo,
              })
            })
            .then((response) => {
              if (response.status = 204) {
                alert("Profile sucessfully updated");
              } else {
                alert("Updating profile failed, try again")
              }
            })
            .catch((error) => {
              console.error(error);
            })
            navigation.dispatch(
              CommonActions.reset({
              index: 1,
              routes: [
                { name: 'Home1' },
                {
                  name: 'Home1',
                },
              ],
              })
            );
          }
        }
      ]
    );
  };
  const onCancelPressed = () => {
    navigation.goBack();
  };

  return (
    <ScrollView>
    <View style={styles.titleContainer}>
      <View style={styles.userButton}>
        <Pressable onPress={onBackIconPressed}>
          <Ionicons name="return-up-back" size={30} color="black" />
        </Pressable>
      </View>
      <Text style={styles.title}>Update Profile</Text>
    </View>
    <View style={styles.container}> 
      <CustomInput 
        value={firstName} 
        setValue={setFirstName}
      />
      <CustomInput 
        value={lastName} 
        setValue={setLastName}
      />
      <CustomInput  
        value={phoneNo} 
        setValue={setPhoneNo}
      />
      {/* <CustomInput 
        placeholder="Email" 
        value={email} 
        setValue={setEmail}
      /> */}
      {/* <View style={styles.passContainer}>
        <TextInput 
          placeholder="Password" 
          value={password} 
          secureTextEntry={passwordVisibility}
          onChangeText= {setPassword}
        />
        <Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color='#232323' />
        </Pressable>
      </View> */}
      {/* <View style={styles.passContainer}>
        <TextInput 
          placeholder="Verify Password" 
          value={passwordRepeat} 
          secureTextEntry={passwordVerifyVisibility}
          onChangeText= {setPasswordRepeat}
        />
        <Pressable onPress={handlePasswordVerifyVisibility}>
          <MaterialCommunityIcons name={rightVerifyIcon} size={22} color='#232323' />
        </Pressable>
      </View>  */}
      <CustomButton 
          text="Update"
          onPress={onUpdatePressed}
      />
      <CustomButton 
          text="Cancel"
          onPress={onCancelPressed}
          type="SECONDARY"
          fgColor='#2C4251'
        />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20
  }, 
  passContainer: {
    backgroundColor: 'white',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#F4F1BB',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginVertical: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10
  },
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
    alignItems: 'flex-start',
    margin: 10
  },
});

export default EditProfileScreen;