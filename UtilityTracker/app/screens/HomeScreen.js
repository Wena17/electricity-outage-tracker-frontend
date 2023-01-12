import { View, Text, ScrollView, StyleSheet, SafeAreaView, Pressable, FlatList } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useNavigation, CommonActions} from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import CustomImageView from '../components/CustomImageView';
import CustomButton from '../components/CustomButton';
import CustomBox from '../components/CustomBox';


const HomeScreen = (props) => {
  const [data, setData] = useState([])
  const [refresh, setRefresh] = useState(true)
  useEffect(() => {
    if(refresh) {
      fetch('https://outage-monitor.azurewebsites.net/api/v1/pinned-locations', {
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
          setRefresh(false)
          setData(json.locations)
        }
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }, [])
  const renderData = (item) => {
    return (
      <CustomBox             
        text= {item.name}             
        btnText='View'
        onPress={() => { 
          navigation.dispatch(
            CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Home1' },
              {
                name: 'ViewModal',
                params: {itemId: item.id, 
                  address: item.address, 
                  name: item.name}
              },
            ],
            })
          );
        }}
      /> 
    )}
  
  const navigation = useNavigation();  

  const onMenuIconPressed = () => {
    navigation.openDrawer();
  }  
  const handleAddModal = () => {
    navigation.dispatch(
      CommonActions.reset({
      index: 1,
      routes: [
        { name: 'Home1' },
        {
          name: 'AddModal',
        },
      ],
    })
  );
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
          <Text style={styles.title}>Schedule outages</Text>
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
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Pinned Location</Text>
          <View style={styles.button}>
            <CustomButton 
              text='Add' 
              onPress={handleAddModal} 
              />
          </View>
        </View>
      </View>
    </ScrollView>
    { data.length == 0 ? 
        <View style={styles.txtContainer}>
          <Text style={styles.txt}>No pinned location</Text>
          <Text style={styles.txt}>Add now!</Text>
        </View> 
        :
      <FlatList
        data={data}
        renderItem={({item}) => {
          return renderData(item)
        }}
        keyExtractor={item => item.id}
        extraData={data}
      />
      }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  button: {
    paddingRight: 5,
    marginTop: -10
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
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
  },
  input: {
    paddingTop: 10,
  },
  modal: {
    width: "100%",
    height: "70%",
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
  
  txtContainer: {
    alignSelf: 'center',
    width: '80%',
    margin: 5,
  },
  txt: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    margin: 5,
    color: 'gray'
  },
})



export default HomeScreen;