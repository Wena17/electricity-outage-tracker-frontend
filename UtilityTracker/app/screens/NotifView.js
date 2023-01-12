import { View, Text, StyleSheet, Alert } from 'react-native';
import React, {useState} from 'react';
import { useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomButton from '../components/CustomButton';

const NotifView = (props) => {
  const navigation = useNavigation();  
  
  const route = useRoute();
  const [isAddModalVisible, setAddModalVisible] = useState(true);  
  const [data, setData] = useState([]);

 
  const handleAddDecline = () => {
    setAddModalVisible(() => !isAddModalVisible);
    navigation.navigate('Home1', {screen: 'Notification'})
  }
  
  const handleDelete = () => {
    Alert.alert(
      "Confirmation",
      "Are you sure to delete this pinned location?",
      [
        {
          text: "Cancel",
          onPress: () => {
          navigation.goBack()
          }
        },
        { 
          text: "OK", onPress: () => {
            console.log(route.params?.itemId)
            fetch('https://outage-monitor.azurewebsites.net/api/v1/notifications/' + route.params?.id, {
              method: 'PUT',
              headers: {
                Accept: 'application/json', 
                'Content-Type': 'application/json',
              }
            })
            .then((response) => response.json())
            .then((json) =>{
              if(json.status == 'success') {
                setAddModalVisible(() => !isAddModalVisible);
                props.model.notifLen = props.model.notifLen - 1
              props.onUpdate(props.model)
                navigation.navigate('Home1', {screen: 'Notification'})
              }
            })
            .catch((error) => {
              console.error(error);
            })            
          }
        }
      ]
    );
    
  }

  return (
    <View>
      <Modal isVisible={isAddModalVisible}>
        <Modal.Container>
          <View style={styles.modal}>
            <Modal.Header title={route.params?.title} />
            <Modal.Body>
              <View style={styles.input}>
                <Text style={styles.text}> 
                 {route.params?.message}
                </Text>
              </View>
            </Modal.Body>
            <Modal.Footer>
              <View>
                <CustomButton text='Delete' onPress={handleDelete}/>
                <CustomButton text='Cancel' onPress={handleAddDecline} type='SECONDARY'/>
              </View>
            </Modal.Footer>
          </View>
        </Modal.Container>
      </Modal>
    </View>
  )
}
const styles = StyleSheet.create({  
  text: {
    fontSize: 16,
    fontWeight: "400",
    textAlign: "center",
    margin: 5,
  },
  input: {
    paddingTop: 10,
  },
  modal: {
    width: "100%",
    height: "65%",
    alignItems: "center",
    justifyContent: "center",
  },  
})


export default NotifView