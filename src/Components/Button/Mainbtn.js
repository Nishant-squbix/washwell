import React from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../Theme/Colors';

const MainBtn = props => {
  console.log(props);
  return (
    <LinearGradient
      style={styles.btn}
      colors={props.disable ? ['#ccc', '#ccc'] : ['#0B713B', '#13AB4B']}>
      <Text style={styles.text}>{props.title}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    height: 58,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: Colors.White,
    letterSpacing: 0.2,
  },
});

export default MainBtn;
