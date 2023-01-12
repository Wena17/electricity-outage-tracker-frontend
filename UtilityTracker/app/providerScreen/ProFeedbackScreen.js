import { View, Text, StyleSheet } from 'react-native';
import React, {useState} from 'react';
import { useNavigation, useRoute, CommonActions} from '@react-navigation/native';
import { Modal } from '../components/CustomModal';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';

const ProFeedbackScreen = (props) => {
  const navigation = useNavigation();  
  const [isModalVisible, setModalVisible] = useState(true);
  const [msg, setMsg] = useState('');
  
  const handleSaveFeedback = () => {
    fetch('https://outage-monitor.azurewebsites.net/api/v1/feedback', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.model.authToken,
      },
      body: JSON.stringify({
        message: msg
      })
    })
    .then((response) => response.json())
    .then((json) => {
      alert(json.message);
    })
    .catch((error) => {
      console.error(error);
    })
    setModalVisible(() => !isModalVisible);
    navigation.dispatch(
      CommonActions.reset({
      index: 1,
      routes: [
        { name: 'ProviderHome' },
        {
          name: 'ProviderHome',
        },
      ],
      })
    );
  };
  const handleDecline = () => {
    
    setModalVisible(() => !isModalVisible);
    navigation.dispatch(
      CommonActions.reset({
      index: 1,
      routes: [
        { name: 'ProviderHome' },
        {
          name: 'ProviderHome',
        },
      ],
      })
    );
  }

  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <View style={styles.modal}>
            <Modal.Header title="Feedback" />
            <Modal.Body>
              <Text style={styles.text}>
                For better service. Tell us what you think.
              </Text>
              <View style={styles.input}>
                <CustomInput value={msg} setValue={setMsg} placeholder='Your Feedback' multiline line={2} />
                <View style={styles.separator}  />
              </View>
            </Modal.Body>
            <Modal.Footer>
              <View style={styles.footer}>                  
                <CustomButton text='Send' onPress={handleSaveFeedback}/>
                <CustomButton text='Cancel' onPress={handleDecline} type='SECONDARY'/>
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
  separator: {
    marginVertical: 20,
    height: 1,
    width: '100%',    
    borderColor: "grey",
    borderBottomWidth: 2,
  },
})


export default ProFeedbackScreen