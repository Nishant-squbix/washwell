import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  BackHandler,
  Alert,
} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import MainBtn from '../Components/Button/Mainbtn';
import Header from '../Components/Header/Header';
import Loader from '../Components/Loader/Loader';
import {getToken, setToken} from '../Redux/slices/userSlice';
import {Colors} from '../Theme/Colors';
import {Apis} from '../Utils/Constant';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [mobileNumber, setMobilenumber] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [eye, setEye] = useState(true);
  const [eye1, setEye1] = useState(true);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const tkn = useSelector(getToken);
  //Error message
  const [error, setError] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [countryflag, setCountryflag] = useState('🇮🇳');
  const [show, setShow] = useState(false);
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

  function usersignin() {
    if (mobileNumber) {
      if (mobileNumber.length == '10') {
        if (password == '1234') {
          console.log('validated');
          login();
        } else {
          setError('password');
        }
      } else {
        setError('phone');
      }
    } else {
      setError('phone');
    }
  }
  console.log('err = ', error);

  const login = () => {
    var data = JSON.stringify({
      countryCode: countryCode,
      phoneNumber: mobileNumber,
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://washwell.up.railway.app/send-otp',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setLoader(false);
        navigation.navigate('Otp', mobileNumber);
      })
      .catch(function (error) {
        console.log(error);
        setLoader(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      {loader && <Loader />}
      <ScrollView>
        <Image
          style={{alignSelf: 'center', margin: 50}}
          source={require('../Assets/Icons/logo.png')}
        />
        <Header Headertitle="Login" Smalltitle="Please Sign in to Continue." />

        <View style={styles.Subinputview}>
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 60,
              width: '35%',
            }}>
            <CountryPicker
              style={{
                modal: {
                  height: 500,
                },
              }}
              show={show}
              searchMessage={'Some search message here'}
              // when picker button press you will get the country object with dial code
              pickerButtonOnPress={item => {
                console.log(item);
                setCountryCode(item.dial_code);
                setCountryflag(item.flag);
                setShow(false);
              }}
            />
            <Text
              style={{
                color: Colors.Black,
                fontFamily: 'Poppins-Regular',
                fontSize: 14,
              }}>
              <Text style={{letterSpacing: 30}}>{countryflag}</Text>
              <Text>{countryCode}</Text>
            </Text>
          </TouchableOpacity>

          <Image
            source={require('../Assets/Image/Phone.png')}
            style={{width: 15, height: 20}}
          />
          <TextInput
            style={styles.placeholder}
            placeholder="Phone Number"
            placeholderTextColor={Colors.gray}
            onChangeText={setMobilenumber}
            value={mobileNumber}
            maxLength={10}
          />
        </View>
        {error == 'phone' && (
          <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
            ** Invalid Mobile Number
          </Text>
        )}
        <View style={styles.inputview}>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/Password.png')}
              style={{width: 24, height: 24}}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Password"
              placeholderTextColor={Colors.lightGray}
              onChangeText={setPassword}
              value={password}
              secureTextEntry={eye1}
            />
            <TouchableOpacity onPress={() => setEye1(!eye1)}>
              {eye1 ? (
                <Image
                  source={require('../Assets/Image/Eye.png')}
                  style={{marginLeft: -25, height: 25, width: 25}}
                />
              ) : (
                <Image
                  source={require('../Assets/Image/Show.png')}
                  style={{marginLeft: -25, height: 21, width: 25}}
                />
              )}
            </TouchableOpacity>
          </View>
          {error == 'password' && (
            <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
              ** Invalid password
            </Text>
          )}
        </View>

        <View style={styles.btnview}>
          <TouchableOpacity
            onPress={
              () => {
                setLoader(true), usersignin();
              }
              // navigation.navigate('Otp')
            }>
            <MainBtn title="Login" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 80,
          }}>
          <Text style={styles.signinbtn}>Don’t have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={[
                styles.signinbtn,
                {color: Colors.primary, marginLeft: 5},
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    marginVertical: 30,
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
    letterSpacing: 1,
  },
  btnview: {
    marginVertical: 20,
  },
  signinbtn: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.Black,
    letterSpacing: 0.2,
  },
});

export default Login;
