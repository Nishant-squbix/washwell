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
import {ScrollView} from 'react-native-gesture-handler';
import {apicaller} from '../Components/ApiCaller/Api';
import MainBtn from '../Components/Button/Mainbtn';
import Header from '../Components/Header/Header';
import {Colors} from '../Theme/Colors';
import {Apis} from '../Utils/Constant';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = React.useState();
  //Error message
  const [error, setError] = React.useState('');
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
  function usersignin() {
    if (email) {
      if (emailRegex.test(email)) {
        Forgotpassword();
      } else {
        setError('emailcheck');
      }
    } else {
      setError('email');
    }
  }
  console.log('err = ', error);

  const Forgotpassword = () => {
    var data = JSON.stringify({
      email: email,
    });

    var config = {
      method: 'post',

      url: `${Apis}/user/forgot-password`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        navigation.navigate('Otp', email);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header
          Headertitle="Forgot Password"
          Smalltitle="Please Sign in to Continue."
        />
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('../Assets/Image/ForgotPassword.png')} />
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={styles.headertxt}>
            Enter Email ID to recover your Password
          </Text>
        </View>

        <View style={styles.inputview}>
          <View style={styles.Subinputview}>
            <Image
              source={require('../Assets/Image/Email.png')}
              style={{width: 24, height: 24}}
            />
            <TextInput
              style={styles.placeholder}
              placeholder="Email Id"
              placeholderTextColor={Colors.lightGray}
              onChangeText={setEmail}
              value={email}
            />
          </View>
          {error == 'email' && (
            <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
              ** Must enter Email ID
            </Text>
          )}
          {error == 'emailcheck' && (
            <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
              ** Invalid Email ID
            </Text>
          )}
        </View>

        <View style={styles.btnview}>
          <TouchableOpacity onPress={() => usersignin()}>
            <MainBtn title="Continue" />
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
    backgroundColor: Colors.Black,
  },

  inputview: {
    marginBottom: 30,
  },

  Subinputview: {
    height: 60,
    borderRadius: 12,
    backgroundColor: Colors.Darkgray,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  placeholder: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.lightGray,
    width: '90%',
    marginLeft: 10,
    marginTop: 5,
    letterSpacing: 0.2,
  },
  btnview: {
    marginVertical: 20,
  },
  headertxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.White,
    letterSpacing: 0.2,
  },
});

export default ForgotPassword;
