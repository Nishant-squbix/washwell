import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const Backbtn = props => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.Button}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../../Assets/Image/arrow-left.png')} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  Button: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Backbtn;
