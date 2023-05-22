import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';
import {Colors} from '../../Theme/Colors';
import {useNavigation} from '@react-navigation/native';
const CongratulationModal = props => {
  console.log(props.screen);
  const [modalshow, setModalshow] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      setModalshow(!modalshow);
      if (props.screen == 'pass') {
        navigation.navigate('Login');
      } else {
        navigation.navigate('Home');
      }
    }, 1800);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalshow}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: Dimensions.get('window').height * 1,
              backgroundColor: 'rgba(0, 0, 0, 0.70)',
            }}
            onPress={() => setModalshow(!modalshow)}>
            <View
              style={{
                backgroundColor: Colors.Darkgray,
                borderRadius: 20,
                padding: 30,
                width: Dimensions.get('window').width * 0.8,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../Assets/Image/Congratulations.png')}
                />
              </View>
              <Text style={styles.Boldtxt}>Congratulations!</Text>
              <Text style={styles.Smalltxt}>
                Your account is ready to use. You will be redirected to the Home
                page in a few seconds..
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: Colors.Black,
  },
  Boldtxt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.Darkpink,
    letterSpacing: 0.2,
    textAlign: 'center',
    marginTop: 10,
  },
  Smalltxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.White,
    letterSpacing: 0.2,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default CongratulationModal;
