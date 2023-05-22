import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Bg from '../Assets/Icons/BgHm.svg';
import Notification from '../Assets/Icons/Notification.svg';
import Check from '../Assets/Icons/check-circle.svg';
import Progress from '../Assets/Icons/Progress.svg';
import Progress1 from '../Assets/Icons/Progress1.svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  emptycart,
  getCart,
  getCartlab,
  getUser,
  removecartid,
  removedata,
  setCart,
} from '../Redux/slices/userSlice';
import {Colors} from '../Theme/Colors';
import MainBtn from '../Components/Button/Mainbtn';
function Home({navigation}) {
  const user = useSelector(getUser);
  const [modalshow, setModalshow] = useState(false);
  const [vno, setVno] = useState();
  const [dname, setDname] = useState();
  const [dmobile, setDmobile] = useState();
  const [unit, setUnit] = useState();
  const [amount, setAmount] = useState();
  const [pin, setPin] = useState();
  const [cardlists, setCardlists] = useState([]);
  const [clickedFirstDiv, setClickedFirstDiv] = useState(false);
  const cardlist = useSelector(getCart);
  const pid = useSelector(getCartlab);
  const dispatch = useDispatch();
  useEffect(() => {
    setCardlists(cardlist);
  }, [cardlist]);
  function check() {
    if (cardlist != null) {
      if (cardlist.length != 0) {
        alertmsg();
      } else {
        senddata();
      }
    } else {
      senddata();
    }
  }
  function senddata() {
    if (clickedFirstDiv) {
      remove();
    } else {
      add();
    }
  }
  function remove() {
    dispatch(removedata(vno));
    dispatch(removecartid(vno));
    setClickedFirstDiv(false);
  }
  function add() {
    let list = {
      vnumber: vno,
      dname: dname,
      dmobile: dmobile,
      unit: unit,
      amount: amount,
      pin: pin,
    };
    console.log('add function');
    dispatch(setCart(list));
    setClickedFirstDiv(true);
  }
  function alertmsg() {
    Alert.alert(
      'Alert',
      ` Lab's test already added in you cart.Do you want to remove those data from cart `,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'Remove', onPress: () => dispatch(emptycart())},
      ],
    );
  }

  console.log('lissdf', cardlist);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{position: 'absolute'}}>
        <Bg />
      </View>
      <View style={{marginTop: 50, marginHorizontal: 25}}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <View style={{marginLeft: 20}}>
            <Text style={styles.wish}>Good Morning</Text>
            <Text style={styles.name}>{user.name}</Text>
          </View>
          <View>
            <Notification />
          </View>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={styles.card}>
          <Text>User Info</Text>
          <Text style={styles.tsk}>
            <Check />
            <Text style={styles.tsk}> Customer ID: 675473</Text>
          </Text>
          <Text style={styles.tsk}>
            <Check />
            <Text style={styles.tsk}> Name : {user.name}</Text>
          </Text>

          <Text style={styles.tsk}>
            <Check />
            <Text style={styles.tsk}> Email : {user.email}</Text>
          </Text>
          <Text style={styles.tsk}>
            <Check />
            <Text style={styles.tsk}> DOB : {user.dob}</Text>
          </Text>
          <Text style={styles.tsk}>
            <Check />
            <Text style={styles.tsk}> Address : {user.address}</Text>
          </Text>
          <Text style={styles.tsk}>
            <Check />
            <Text style={styles.tsk}> PAN : {user.pan}</Text>
          </Text>
          <Text style={styles.tsk}>
            <Check />
            <Text style={styles.tsk}> Aadhar: {user.aadhar}</Text>
          </Text>
        </View>
      </View>

      <View style={{marginHorizontal: 25}}>
        <View style={styles.project}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Vehicle</Text>
          <TouchableOpacity onPress={() => setModalshow(!modalshow)}>
            <Text style={{color: Colors.primary}}>ADD</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {cardlist.length == 0 && <Text>No Vehicle added</Text>}
          {cardlists.map(e => {
            return (
              <View style={styles.cardproject}>
                <View style={{padding: 5}}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(removecartid(e.vnumber));
                      dispatch(removedata(e.vnumber));
                    }}>
                    <Text
                      style={{
                        fontSize: 10,
                        margin: 5,
                        alignSelf: 'flex-end',
                        color: Colors.Red,
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>

                  <Text
                    style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
                    {e.vnumber}
                  </Text>
                  {e.dname && (
                    <Text style={{fontSize: 12, marginBottom: 10}}>
                      driver name :{e.dname}
                    </Text>
                  )}
                  {e.dmobile && (
                    <Text style={{fontSize: 12, marginBottom: 10}}>
                      driver number :{e.dmobile}
                    </Text>
                  )}
                  {e.amount && (
                    <Text style={{fontSize: 12, marginBottom: 10}}>
                      amount :{e.amount}
                    </Text>
                  )}
                  {e.dname && (
                    <Text style={{fontSize: 12, marginBottom: 10}}>
                      driver name :{e.dname}
                    </Text>
                  )}
                  {e.pin && (
                    <Text style={{fontSize: 12, marginBottom: 10}}>
                      PIN :{e.pin}
                    </Text>
                  )}
                </View>
              </View>
            );
          })}
        </View>
      </View>

      {/* <View style={{marginHorizontal: 30}}>
        <View style={styles.project}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>Drivers</Text>
          <Text style={{color: 'black'}}>Add</Text>
        </View>
        <View style={styles.taskview}>
          <View />
        </View>
      </View> */}
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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: Dimensions.get('window').height * 1,
              backgroundColor: 'rgba(0, 0, 0, 0.70)',
            }}>
            <ScrollView>
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
                  Add Vehicle
                </Text>
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                  }}>
                  <View style={styles.inputview}>
                    <View style={styles.Subinputview}>
                      <TextInput
                        style={styles.placeholder}
                        placeholder="Enter Vehicle No."
                        placeholderTextColor={Colors.Black}
                        onChangeText={setVno}
                        value={vno}
                      />
                    </View>
                  </View>
                  <View style={styles.inputview}>
                    <View style={styles.Subinputview}>
                      <TextInput
                        style={styles.placeholder}
                        placeholder="Enter Driver's Name"
                        placeholderTextColor={Colors.Black}
                        onChangeText={setDname}
                        value={dname}
                      />
                    </View>
                  </View>
                  <View style={styles.inputview}>
                    <View style={styles.Subinputview}>
                      <TextInput
                        style={styles.placeholder}
                        placeholder="Enter Driver's Mobile Number"
                        placeholderTextColor={Colors.Black}
                        keyboardType="number-pad"
                        onChangeText={setDmobile}
                        value={dmobile}
                      />
                    </View>
                  </View>
                  <View style={styles.inputview}>
                    <View style={styles.Subinputview}>
                      <TextInput
                        style={styles.placeholder}
                        placeholder="Enter UNIT"
                        placeholderTextColor={Colors.Black}
                        onChangeText={setUnit}
                        value={unit}
                      />
                    </View>
                  </View>
                  <View style={styles.inputview}>
                    <View style={styles.Subinputview}>
                      <TextInput
                        style={styles.placeholder}
                        placeholder="Enter fule amount"
                        placeholderTextColor={Colors.Black}
                        onChangeText={setAmount}
                        value={amount}
                      />
                    </View>
                  </View>
                  <View style={styles.inputview}>
                    <View style={styles.Subinputview}>
                      <TextInput
                        style={styles.placeholder}
                        placeholder="Set Pin"
                        placeholderTextColor={Colors.Black}
                        onChangeText={setPin}
                        value={pin}
                        maxLength={6}
                        keyboardType="number-pad"
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{width: 200}}
                    onPress={() => {
                      senddata();
                      setVno('');
                      setAmount('');
                      setPin('');
                      setDmobile('');
                      setDname('');
                      setUnit('');
                      setModalshow(false);
                    }}>
                    <MainBtn title="submit" />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
export default Home;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputview: {
    marginBottom: 30,
  },

  Subinputview: {
    width: Dimensions.get('window').width * 0.7,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  txt: {
    fontFamily: 'Poppins-Bold',
    fontSize: 50,
  },
  wish: {
    color: 'white',
  },
  name: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',

    width: Dimensions.get('window').width - 50,
    marginTop: 60,
    borderRadius: 10,
    shadowColor: '#000',
    padding: 20,

    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    justifyContent: 'space-between',
  },
  tsk: {
    color: 'black',
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  project: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  cardproject: {
    width: 170,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
    backgroundColor: 'white',
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 5,
  },
  taskview: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height / 9,
    backgroundColor: '#F9FDFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DFF4FF',
  },
});
