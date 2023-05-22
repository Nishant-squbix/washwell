import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
  ToastAndroid,
  BackHandler,
  Modal,
  Dimensions,
  Alert,
} from 'react-native';

import Header from '../Components/Header/Header';
import {CountryPicker} from 'react-native-country-codes-picker';
import {CountryCode, Country} from './src/types';
import {request, PERMISSIONS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MainBtn from '../Components/Button/Mainbtn';
import {Colors} from '../Theme/Colors';
import CongratulationModal from '../Components/Modal/Modal';
import {apicaller} from '../Components/ApiCaller/Api';
import axios from 'axios';
import {Apis} from '../Utils/Constant';
import Loader from '../Components/Loader/Loader';
import {useDispatch} from 'react-redux';
import {setUser} from '../Redux/slices/userSlice';

const ProfileSetUp = ({navigation, route}) => {
  const [countryCode, setCountryCode] = useState('+91');
  const [countryflag, setCountryflag] = useState('🇮🇳');
  const [show, setShow] = useState(false);
  console.log(route.params);
  const [proimg, setProimg] = useState();
  const [modalshow, setModalshow] = useState(false);
  const [firstName, setFirstname] = useState('');
  const [dob, setDob] = useState();
  const [gender, setGender] = useState();
  const [pan, setPan] = useState();
  const [aadhar, setAadhar] = useState();
  const [email, setEmail] = useState();
  const [country, setCountry] = useState();
  const [cong, setCong] = useState(false);
  const [err, setErr] = useState();
  const [loader, setLoader] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    setDob(JSON.stringify(date).slice(1, 11));
    console.log('A date has been picked: ', date);
    hideDatePicker();
  };
  const selectCamera = async () => {
    function showToast() {
      ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
    }
    let options = {
      mediaType: 'photo',
      includeBase64: false,
      multiple: true,
      maxHeight: 500,
      maxWidth: 500,
      quality: 1,
    };
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    ).then(result => {
      if (result == 'granted') {
        launchCamera(options, response => {
          if (response.didCancel) {
            Alert.alert('You did not select any image');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
          } else {
            setProimg(response.assets[0]);
            console.log(response.assets[0].uri);
          }
        });
      } else {
        Alert.alert('Go to settings > Washwell > Allow camera permission');
      }
    });
  };
  const selectGallery = () => {
    let options = {
      mediaType: 'photo',
      includeBase64: false,
      multiple: true,
      maxHeight: 500,
      maxWidth: 500,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
        Alert.alert('You did not select any image');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
      } else {
        console.log(response.assets[0]);
        setProimg(response.assets[0]);
      }
    });
  };

  function validation() {
    if (firstName) {
      if (email) {
        if (dob) {
          if (country) {
            if (pan) {
              if (aadhar) {
                if (proimg) {
                  setLoader(true);
                  signup();
                } else setErr('Image');
              } else setErr('aadhar');
            } else setErr('pan');
          } else setErr('country');
        } else setErr('dob');
      } else setErr('mobileNumber');
    } else setErr('firstName');
  }
  function signup() {
    var data = {
      name: firstName,
      email: email,
      dob: dob,
      address: country,
      pan: pan,
      aadhar: aadhar,
      doc: proimg,
    };
    dispatch(setUser(data));
    navigation.navigate('Home');
  }
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);
  const backAction = () => {
    navigation.goBack();
    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{alignSelf: 'center', marginTop: 30}}
        source={require('../Assets/Icons/logo.png')}
      />
      <View>
        <Header Headertitle="KYC" Smalltitle="Please Set Up to Continue." />
      </View>

      <ScrollView>
        <View style={styles.inputview}>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/ProfileSmall.png')}
              style={{width: 15, height: 20}}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="User Name"
              placeholderTextColor={Colors.Black}
              onChangeText={setFirstname}
              value={firstName}
            />
          </View>
          {err == 'firstName' && (
            <Text style={{color: 'red', alignSelf: 'flex-end'}}>
              ** Invalid
            </Text>
          )}
        </View>
        <View style={styles.inputview}>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/ProfileSmall.png')}
              style={{width: 15, height: 20}}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Email"
              placeholderTextColor={Colors.Black}
              onChangeText={setEmail}
              value={email}
            />
          </View>
          {err == 'email' && (
            <Text style={{color: 'red', alignSelf: 'flex-end'}}>
              ** Invalid
            </Text>
          )}
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity onPress={showDatePicker} style={styles.inputview}>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/Calendar.png')}
              style={{width: 18, height: 20}}
            />
            <TextInput
              style={[styles.placeholder, {width: '50%'}]}
              placeholder="DOB"
              placeholderTextColor={Colors.Black}
              onChangeText={setDob}
              editable={false}
              value={dob}
            />
          </View>

          {err == 'dob' && (
            <Text style={{color: 'red', alignSelf: 'flex-end'}}>
              ** Required
            </Text>
          )}
        </TouchableOpacity>
        {/* <View style={styles.inputview}>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/Gender.png')}
              style={{width: 18, height: 20}}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Gender"
              placeholderTextColor={Colors.Black}
              onChangeText={setGender}
              value={gender}
            />
          </View>
          {err == 'gender' && (
            <Text style={{color: 'red', alignSelf: 'flex-end'}}>
              ** Required
            </Text>
          )}
        </View> */}

        <View style={styles.inputview}>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/Location.png')}
              style={{width: 20, height: 20}}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Address"
              placeholderTextColor={Colors.Black}
              onChangeText={setCountry}
              value={country}
            />
          </View>
          {err == 'country' && (
            <Text style={{color: 'red', alignSelf: 'flex-end'}}>
              ** Required
            </Text>
          )}
        </View>
        <View style={styles.inputview}>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/Location.png')}
              style={{width: 20, height: 20}}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Pan"
              placeholderTextColor={Colors.Black}
              onChangeText={setPan}
              value={pan}
            />
          </View>
          {err == 'pan' && (
            <Text style={{color: 'red', alignSelf: 'flex-end'}}>
              ** Required
            </Text>
          )}
        </View>
        <View style={styles.inputview}>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/Location.png')}
              style={{width: 20, height: 20}}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Aadhar"
              placeholderTextColor={Colors.Black}
              onChangeText={setAadhar}
              value={aadhar}
            />
          </View>
          {err == 'aadhar' && (
            <Text style={{color: 'red', alignSelf: 'flex-end'}}>
              ** Required
            </Text>
          )}
        </View>
        <View style={[styles.Profile, {alignSelf: 'center'}]}>
          <TouchableOpacity onPress={() => setModalshow(!modalshow)}>
            <View style={styles.Circle}>
              {proimg ? (
                <Image
                  source={{uri: proimg.uri}}
                  style={{borderRadius: 10, height: 200, width: 200}}
                />
              ) : (
                <>
                  <Image
                    source={require('../Assets/Image/Profile.png')}
                    style={{width: 30, height: 40}}
                  />
                  <Text style={{margin: 5, color: Colors.gray}}>
                    Upload Document
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10, marginBottom: 15}}>
          {err == 'Image' && (
            <Text style={{color: 'red'}}>Please Upload Image</Text>
          )}
        </View>
        <View style={styles.btnview}>
          <TouchableOpacity
            onPress={
              () => validation()
              // navigation.navigate('Home')
            }>
            <MainBtn title="Continue" />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: 'white',
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
                backgroundColor: Colors.White,
                borderRadius: 20,
                padding: 30,
                width: Dimensions.get('window').width * 0.8,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: 'Poppins-Medium',
                  color: Colors.Black,
                  marginBottom: 20,
                  textAlign: 'center',
                }}>
                Upload Image
              </Text>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    borderBottomColor: 'gray',
                    marginTop: 20,
                  }}
                  onPress={() => {
                    setModalshow(!modalshow);
                    selectCamera();
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Poppins-Regular',
                      color: Colors.Black,
                    }}>
                    Upload From Camera
                  </Text>
                  <Image
                    style={{height: 20, width: 20}}
                    source={require('../Assets/Image/Camera.png')}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    height: 40,
                    marginTop: 20,
                  }}
                  onPress={() => {
                    setModalshow(!modalshow);
                    selectGallery();
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Poppins-Regular',
                      color: Colors.Black,
                    }}>
                    Upload From Gallery
                  </Text>
                  <Image
                    style={{height: 20, width: 20}}
                    source={require('../Assets/Image/gall.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
      {cong && <CongratulationModal screen="profile" />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: Colors.White,
  },
  inputview: {
    marginBottom: 30,
  },

  Subinputview: {
    height: 60,
    borderRadius: 12,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  placeholder: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.Black,
    width: '90%',
    marginLeft: 10,
    marginTop: 5,
    letterSpacing: 0.2,
  },
  btnview: {
    marginVertical: 40,
  },
  Profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  Circle: {
    height: 200,
    width: 200,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  uploadtxt: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.Darkpink,
    letterSpacing: 0.2,
    marginLeft: 20,
  },
});

export default ProfileSetUp;
