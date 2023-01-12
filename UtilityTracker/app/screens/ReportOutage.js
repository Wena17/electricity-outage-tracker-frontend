import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation, CommonActions} from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomButton from '../components/CustomButton';
import {useForm} from 'react-hook-form';
import { AntDesign } from '@expo/vector-icons';

import { GOOGLE_API_KEY } from '../../environments';
import Geocoder from 'react-native-geocoding';
import * as Location from 'expo-location';

Geocoder.init(GOOGLE_API_KEY);

const ReportOutage = (props) => {
  const navigation = useNavigation();
  const [reportVisible, setReportVisible] = useState(true);
  // const [disabled, setDisabled] = useState(false);  
  // const [color, setColor] = useState(null);    
  // const [location, setLocation] = useState({
  //   address: "Click get location to get your address"
  // });  
  // const [latLng, setLatLng] = useState({
  //   latitude: 12.606724756594522,
  //   longitude: 122.92937372268332,
  // });

  // const getLocation = async () => {
  //   setLocation({ 
  //     address: 'Locating....' 
  //   });    
  //   setDisabled(true);
  //   setColor('DISABLED');
  //   let {status} = await Location.requestForegroundPermissionsAsync();
  //   if(status !== 'granted') {
  //     setErrorMsg('Permission to access location was denied');
  //   }
  //   let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
  //   setLatLng({ 
  //     latitude: location.coords.latitude,
  //     longitude:location.coords.longitude,
  //   });
  //   Geocoder.from(location.coords.latitude, location.coords.longitude)
  //     .then(json => {
  //       var addressComponent = json.results[0].formatted_address;
  //       setLocation({ 
  //         address: addressComponent 
  //       });        
  //     })
  //     .catch(error => {
  //       console.warn(error)
  //       setLocation({ 
  //         address: 'Unable to locate' 
  //       });    
  //       setDisabled(false);
  //       setColor('');
  //     });
  // }  
  const onMenuIconPressed = () => {
    navigation.openDrawer();
  }  
  const onReport = () => {
    fetch('https://outage-monitor.azurewebsites.net/api/v1/outage-manual-reporting', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.model.authToken,
      }
    })
    .then((response) => response.json())
    .then((json) => {
      alert(json.message);
    })
    .catch((error) => {
      console.error(error);
    })
    setReportVisible(() => !reportVisible);
    navigation.dispatch(
      CommonActions.reset({
      index: 1,
      routes: [
        { name: 'Home1' },
        {
          name: 'Home1 '
        },
      ],
      })
    );
  };
  const onDecline = () => {
    setReportVisible(() => !reportVisible);
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

  return (
    <View>
    <View style={styles.userButton}>
      <Pressable onPress={onMenuIconPressed}>
        <AntDesign name="menufold" size={30} color="gray" />
      </Pressable>
    </View>
    <Modal isVisible={reportVisible}>
      <Modal.Container>
        <View style={styles.modal}>
          <Modal.Header title="Did your device failed to detect the outage?" />
          <Modal.Body>
            {/* <Text style={styles.text}>
              Did your device fail?
            </Text> */}
            {/* <View style={styles.input}>
              <Text style={styles.text}> 
              {location.address}
              </Text>              
              <CustomButton 
                text='Get Location'                   
                disabled={disabled}
                onPress={getLocation} 
                type={color}
                bgColor='#D7E2EA'
                fgColor='#2C4251'
              /> 
              <View style={styles.separator}  />
            </View> */}
          </Modal.Body>
          <Modal.Footer>
            <View>                  
              <CustomButton text='Yes' onPress={onReport}/>
              <CustomButton text='No' onPress={onDecline} type='SECONDARY'/>
            </View>
          </Modal.Footer>
        </View>
      </Modal.Container>
    </Modal>
  </View>
  )
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "400",
    textAlign: "center",
    margin: 5,
  },
  input: {
    paddingTop: 10,
  },
  modal: {
    width: "100%",
    height: "55%",
    alignItems: "center",
    justifyContent: "center",
  },  
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',    
    borderColor: "grey",
    borderBottomWidth: 2,
  }, 
  userButton: { 
    padding: 10,
  },
})


export default ReportOutage