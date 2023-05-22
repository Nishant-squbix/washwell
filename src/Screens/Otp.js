import React, {useEffect} from 'react';
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
import MainBtn from '../Components/Button/Mainbtn';
import {Colors} from '../Theme/Colors';
import Backbtn from '../Components/Button/Backbtn';
import axios from 'axios';
import {Apis, width} from '../Utils/Constant';

const Otp = ({navigation, route}) => {
  const [otp1, setOtp1] = React.useState(0);
  const [err, setErr] = React.useState();
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

  const Otpenter = () => {
    var data = JSON.stringify({
      countryCode: '91',
      phoneNumber: route.params,
      otp: otp1,
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://washwell.up.railway.app/verify-otp',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setErr(false);
        navigation.navigate('ProfileSetUp');
      })
      .catch(function (error) {
        console.log(error);
        setErr(true);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{marginVertical: 30}}>
          <Backbtn />
        </View>
        <Image
          style={{alignSelf: 'center', margin: 10}}
          source={require('../Assets/Icons/logo.png')}
        />
        <View style={styles.mailview}>
          <Text style={styles.headertxt}>Code has been send to</Text>
          <Text style={[styles.headertxt, {color: Colors.primary}]}>
            {route.params}
          </Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.Subinputview}>
            <TextInput
              style={[styles.placeholder]}
              placeholder="****"
              placeholderTextColor={Colors.lightGray}
              onChangeText={setOtp1}
              value={otp1}
              maxLength={4}
            />
          </View>
        </View>
        {err && (
          <Text style={{color: Colors.Red, alignSelf: 'flex-end'}}>
            ** Invalid OTP
          </Text>
        )}

        <View style={styles.btnview}>
          <TouchableOpacity
            disabled={otp1.length == 4 ? false : true}
            onPress={() => Otpenter()}>
            <MainBtn disable={otp1.length == 4 ? false : true} title="Verify" />
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

  btnview: {
    marginVertical: 80,
  },
  headertxt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.Black,
    letterSpacing: 0.2,
  },
  mailview: {
    alignItems: 'center',
    marginVertical: 50,
  },
  Subinputview: {
    height: 60,
    borderRadius: 12,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    borderColor: Colors.lightGray,
    borderWidth: 0.5,
  },
  placeholder: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 40,
    fontSize: 24,
    height: 60,
    width: 250,
    color: Colors.Black,

    textAlign: 'center',
  },
});

export default Otp;
