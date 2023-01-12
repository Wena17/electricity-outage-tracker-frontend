import React, {useState} from 'react';
import { Image, View, StyleSheet, useWindowDimensions, ScrollView, TextInput } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import Logo from '../assets/UTLogo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useTogglePasswordVisibility } from '../components/UseTogglePasswordVisibility';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';

const LoginScreen = (props) => {
  
  const navigation = useNavigation();  

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {height} = useWindowDimensions();

  const onLoginPressed = () => {
    fetch('https://outage-monitor.azurewebsites.net/api/v1/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        pushToken: props.model.pushToken
      })
    })
    .then((response) => response.json())
    .then((json) => {
      if(json.status == 'success') {
        console.log("Login push token: " + props.model.pushToken)
        alert(json.message);
        props.model.authToken = json.auth_token
        props.model.id = json.user_id
        props.model.fname = json.fname
        props.model.technician = json.technician
        props.onUpdate(props.model)
        if(json.technician){
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'ProviderHome',
              },
            ],
          })
        }
        else {
          navigation.reset({
            index: 0,
            routes: [
              {
                name: 'Home1',
              },
            ],
          })
        }
      }
      else {
        alert(json.message);
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  }
  const onSignUpPressed = () => {
    navigation.navigate('Signup')
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} >
      <View style={styles.container}>
        <Image 
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="Email"
          value={email} 
          setValue={setEmail}
        />    
        <View style={styles.passContainer}>
          <TextInput 
            placeholder="Password" 
            value={password} 
            secureTextEntry={passwordVisibility}
            onChangeText= {setPassword}
          />
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={22} color='black' />
          </Pressable>
        </View>
        <CustomButton 
          text="Login"
          onPress={onLoginPressed}
        />
        <CustomButton 
          text="Forgot password"
          onPress={onForgotPasswordPressed}
          bgColor='#D7E2EA'
        />
        <CustomButton 
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
          fgColor='#2C4251'
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20, 
    height: '100%'
  },
  logo: {
    width: '80%',
    maxWidth: 350,
    MaxHeight: 200,
    top: '5%'
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
})

// function pushNotification(pushToken, authToken) {
//   fetch('https://outage-monitor.azurewebsites.net/api/v1/users/' + json.user_id + '/pushToken', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json', 
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + authToken,
//       },
//       body: JSON.stringify({
//         pushToken: pushToken
//       })
//     })
//     .then((response) => { if (response.status !== 200) {
//       console.log("Push token not accepted")
//     }})
//     .catch((error) => {
//       console.error(error);
//     })
// }

export default LoginScreen;