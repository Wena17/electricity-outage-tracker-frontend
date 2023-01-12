import { View, Text, StyleSheet, Alert } from 'react-native';
import React, {useState} from 'react';
import { useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomButton from '../components/CustomButton';

const HistoryView = (props) => {
  const navigation = useNavigation();  
  
  const route = useRoute();
  const [isAddModalVisible, setAddModalVisible] = useState(true);

 
  const handleAddDecline = () => {
    setAddModalVisible(() => !isAddModalVisible);
    navigation.goBack();
  }
  
  return (
    <View>
      <Modal isVisible={isAddModalVisible}>
        <Modal.Container>
          <View style={styles.modal}>
            <Modal.Header title={ route.params?.type == 0 ? 'Device Detection' : 'Manual Reporting'} />
            <Modal.Body>
              <View style={styles.input}>
                <Text style={styles.text}> Address: 
                 { route.params?.address }
                </Text>
                <Text style={styles.text}> Start time: 
                 {route.params?.start}
                </Text>
                <Text style={styles.text}> End time: 
                 {route.params?.end}
                </Text>
                <Text style={styles.text}> Reason: 
                 {route.params?.reason}
                </Text>
              </View>
            </Modal.Body>
            <Modal.Footer>
              <View>
                <CustomButton text='Close' onPress={handleAddDecline} type='SECONDARY'/>
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


export default HistoryView