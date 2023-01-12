import { View, Text, SafeAreaView, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';

import { useNavigation, CommonActions } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';

import CustomBox from '../components/CustomBox';
import CustomNotif from '../components/CustomNotif';

const OutageHistoryScreen = (props) => {

  const navigation = useNavigation();

  const [history, setHistory] = useState([])
  const [refresh, setRefresh] = useState(true)

  useEffect(() => {
    if(refresh) {
      fetch('https://outage-monitor.azurewebsites.net/api/v1/outage-history', {
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
          setHistory(json.History)
          setRefresh(false)
          console.log("History: " + JSON.stringify(json.History))
        }
      })
      .catch((error) => {
        console.error(error);
      })
    }    
  }, [])

  const renderData = (item) => {
    return (
      // <CustomBox             
      //   text= { item.type == 0 ? 'Device Detection' : 'Manual Reporting'}             
      //   btnText='View'
      //   onPress={() => { 
      //     navigation.dispatch(
      //       CommonActions.reset({
      //       index: 1,
      //       routes: [
      //         { name: 'Home1' },
      //         {
      //           name: 'HistoryView',
      //           params: {address: item.address, end: item.end, start: item.start, reason: item.reason, type: item.type, }
      //         },
      //       ],
      //       })
      //     );
      //   }}
      // />
      <CustomNotif
      title= { item.type == 0 ? 'Device Detection' : 'Manual Reporting'} 
      info={'Date: ' + item.start}            
      btnText='View'
      onPress={() => { 
        navigation.dispatch(
          CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Home1' },
            {
              name: 'HistoryView',
              params: {address: item.address, end: item.end, start: item.start, reason: item.reason, type: item.type, }
            },
          ],
          })
        );
      }}
    />
    )
  }

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
          <Text style={styles.title}>Outage History</Text>
        </View>        
        {/* <View style={styles.txtContainer}>
          <Text style={styles.txt}>No Outage History Available</Text>
        </View> */}
      </ScrollView>
      <FlatList
          data={history}
          renderItem={({item}) => {
            return renderData(item)
          }}
          keyExtractor={item => item.id}
          extraData={history}
        />
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

export default OutageHistoryScreen