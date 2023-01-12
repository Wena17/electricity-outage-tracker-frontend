import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomNotif from '../components/CustomNotif';

import { useNavigation, CommonActions } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';


const NotificationScreen = (props) => {
  const navigation = useNavigation();
  
  const [notif, setNotif] = useState([])
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    if(refresh) {
      fetch('https://outage-monitor.azurewebsites.net/api/v1/notification', {
        method: 'GET',
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + props.model.authToken,
        }
      })
      .then((response) => response.json())
      .then((json) =>{
        if(json.status == 'success') {
          setNotif(json.Notif)
          setRefresh(false)
          props.model.notifLen = json.Notif.length
          props.onUpdate(props.model)
          console.log("Notification: " + json.Notif.length)
        }
      })
      .catch((error) => {
        console.error(error);
      })
    }    
  }, [])

  const renderNotif = (item) => {
    return (
      <CustomNotif
      title={item.title} 
      info={item.message}            
      btnText='View'
      onPress={() => { 
        navigation.dispatch(
          CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Home1' },
            {
              name: 'NotifView',
              params: {id: item.id, 
                title: item.title, 
                message: item.message}
            },
          ],
          })
        );
      }}
    />
    )
  }
  const onMenuIconPressed = () => {
    navigation.navigate('Home1', {screen: 'Home2'})
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
          <Text style={styles.title}>Notification</Text>
        </View>
      </ScrollView>
      { notif.lenght === 0 ? <Text style={styles.title}>No Notification</Text> : 
      <FlatList
        data={notif}
        renderItem={({item}) => {
          return renderNotif(item)
        }}
        keyExtractor={item => item.id}
        extraData={notif}
      />
      }
      
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
})

export default NotificationScreen;