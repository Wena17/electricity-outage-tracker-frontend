import React, {useEffect} from 'react';
import { View } from 'react-native';

import { useNavigation, CommonActions } from '@react-navigation/native';

const Signout = (props) => {

  const navigation = useNavigation(); 

    fetch('https://outage-monitor.azurewebsites.net/api/v1/logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.model.authToken,
      }
    })
    .then((response) => response.json())
    .then((json) => {
      if(json.status == 'success') {
        props.model.authToken = null
        props.model.id = null
        props.model.fname = null
        props.model.technician = null
        props.onUpdate(props.model)
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'Login',
            },
          ],
        })
      }
    })
    .catch((error) => {
      console.error(error);
    })

  return (
    <View>

    </View>
  );
}

export default Signout;