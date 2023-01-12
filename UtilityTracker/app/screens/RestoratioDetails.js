import { View, Text, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useNavigation, useRoute} from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomButton from '../components/CustomButton';

const RestorationDetails = () => {
  const navigation = useNavigation();  
  
  const route = useRoute();
  const [isAddModalVisible, setAddModalVisible] = useState(true);  
  const [data, setData] = useState([]);

  useEffect(() => {
  if (route.params?.dev_id != null) {
    console.log("Device ID: " + route.params?.dev_id + route.params?.outage)
    fetch('https://outage-monitor.azurewebsites.net/api/v1/restoration-details/' + route.params?.dev_id, {
      method: 'GET',
      headers: {
        Accept: 'application/json', 
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((json) =>{
      if(json.status == 'success') {
        setData(json.Details)
        console.log("Restoration: " + JSON.stringify(json.Details))
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }
}, [])
 
  const handleAddDecline = () => {
    setAddModalVisible(() => !isAddModalVisible);
    navigation.navigate('Home1', {screen: 'Outage map'})
  }

  return (
    <View>
      <Modal isVisible={isAddModalVisible}>
        <Modal.Container>
          <View style={styles.modal}>
            <Modal.Header title="Estimated Restoration details" />
            <Modal.Body>
              <View style={styles.input}>
                <Text style={styles.text}> Reason:  
                 { data.map((item, key) => (item.reason))}
                </Text>
                <Text style={styles.text}> Estimated End time:  
                 { data.map((item, key) => (item.est_end_time)) }
                </Text>
              </View>
            </Modal.Body>
            <Modal.Footer>
              <View>
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
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
  },  
})


export default RestorationDetails