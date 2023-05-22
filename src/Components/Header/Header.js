import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Colors} from '../../Theme/Colors';

const Header = props => {
  return (
    <View style={styles.headerview}>
      <Text style={styles.Bigheader}>{props.Headertitle}</Text>
      <Text style={styles.SmallTitle}>{props.Smalltitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerview: {
    marginTop: 50,
    paddingBottom: 50,
  },
  Bigheader: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    color: Colors.Black,
  },
  SmallTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.Black,
  },
});

export default Header;
