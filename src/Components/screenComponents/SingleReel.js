import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  Share,
  BackHandler,
  KeyboardAvoidingView,
} from 'react-native';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {getComment, getToken, setComment} from '../../Redux/slices/userSlice';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import {Apis} from '../../Utils/Constant';
import {Colors} from '../../Theme/Colors';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {colors} from 'react-native-swiper-flatlist/src/themes';
const SingleReel = ({item, index, currentIndex, Videocall}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const videoRef = useRef(null);
  const onBuffer = buffer => {
    // console.log('buffring', buffer);
  };
  const onError = error => {
    // console.log('error', error);
  };
  const [tesx, setTesx] = useState('');
  const [mute, setMute] = useState(false);
  const [com, setCom] = useState(false);
  const [follow, setFollow] = useState(false);
  var [likcon, setLikcon] = useState(item?.likes.length);
  // console.log('item', item);
  const comm = useSelector(getComment);
  const Token = useSelector(getToken);
  const [likestatus, setlikeStatus] = useState(false);
  const dispatch = useDispatch();
  // console.log('commm bvghjvghjcvghjcf', comm);
  function likeing() {
    // setlikeStatus(!likestatus);

    var config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `https://shorts-uddv.onrender.com/api/v1/post/like-dislike/${item._id}`,
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setlikeStatus(!likestatus);
        if (response.data.result.message == 'Disliked Successfully') {
          setLikcon(--likcon);
        }
        if (response.data.result.message == 'Liked Successfully') {
          setLikcon(++likcon);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    const dmtok = jwt_decode(Token);
    // console.log('dmtok', dmtok.data._id);
    item?.likes.map(e => {
      // console.log('nkbjvhhu', e._id == dmtok.data._id);
      if (e._id == dmtok.data._id) {
        setlikeStatus(true);
      } else {
        setlikeStatus(false);
      }
    });
  }, []);

  function commen() {
    // setComment(!comm);
    // setCom(!com);
    var data = JSON.stringify({
      comment: tesx,
    });

    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://shorts-uddv.onrender.com/api/v1/post/comment/${item._id}`,
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        Videocall();
        setTesx('');
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  function followme(ids) {
    dispatch(setComment(follow));
    var config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${Apis}/user/follow-unfollow/${ids}`,
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.result.message));

        if (response.data.result.message == 'Unfollow') {
          setFollow(false);
        } else {
          setFollow(true);
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });
  }

  useEffect(() => {
    if (Token) {
      const dmtok = jwt_decode(Token);
      var pop = dmtok.data._id;
      console.log('followers', item.owner.followers, pop);
      if (item.owner.followers) {
        if (item.owner.followers.includes(pop)) {
          setFollow(true);
          console.log(',mbhjghcffckhvjfgxkj,hbvncghxf');
        }
      }
    }
  }, []);

  var isSelectionModeEnabled = true;
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (isSelectionModeEnabled) {
          Alert.alert('Hold on!', 'Are you sure you want to go back?', [
            {
              text: 'Cancel',
              onPress: () => setCom(false),
              style: 'cancel',
            },
            {text: 'YES', onPress: () => BackHandler.exitApp()},
          ]);
          return true;
        } else {
          return false;
        }
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );
      return () => subscription.remove();
    }, [isSelectionModeEnabled]),
  );

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setMute(!mute)}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>
        <Video
          videoRef={videoRef}
          onBuffer={onBuffer}
          onError={onError}
          repeat={true}
          resizeMode="cover"
          paused={currentIndex == index ? false : true}
          source={{uri: item.video.url}}
          muted={mute}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
          }}
        />
      </TouchableOpacity>

      <Image
        source={require('../../Assets/Icons/mute.png')}
        style={[
          styles.icon,
          {
            height: 25,
            width: 25,
            display: mute ? 'flex' : 'none',
          },
        ]}
        resizeMode={'contain'}
      />
      <View
        style={{
          position: 'absolute',
          width: windowWidth - 100,
          zIndex: 1,
          bottom: 0, //edited
          left: 0,
          padding: 10,
          display: !com ? 'flex' : 'none',
        }}>
        <View>
          <View
            style={{width: 100, flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.row}>
              <Image
                source={{uri: item?.owner?.picture?.url}}
                style={[styles.avatar]}
              />
              <Text numberOfLines={1} style={[styles.userName]}>
                {item.owner.name}
              </Text>

              <View
                style={{
                  backgroundColor: 'white',
                  height: 5,
                  width: 5,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              />
              <TouchableOpacity
                style={styles.followbtn}
                onPress={() => {
                  followme(item.owner._id);
                }}>
                {!follow ? (
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 12,
                      color: Colors.White,
                      letterSpacing: 0.2,
                    }}>
                    Follow
                  </Text>
                ) : (
                  <Text
                    style={{
                      fontFamily: 'Poppins-Regular',
                      fontSize: 12,
                      color: Colors.White,
                      letterSpacing: 0.2,
                    }}>
                    Unfollow
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 20,
          }}>
          <Image
            source={require('../../Assets/Icons/music.png')}
            style={{height: 20, width: 20, marginRight: 10}}
          />
          <Text
            style={[
              {
                color: colors.white,
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                letterSpacing: 0.2,
              },
            ]}
            numberOfLines={2}>
            {item?.caption}
          </Text>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 10, //edited
          right: 0,
          display: !com ? 'flex' : 'none',
        }}>
        <TouchableOpacity
          onPress={() => {
            likeing();
          }}
          style={{padding: 10}}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              height: 55,
              width: 55,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            {likestatus ? (
              <Image
                source={require('../../Assets/Icons/heart.png')}
                style={[styles.icon]}
                resizeMode={'contain'}
              />
            ) : (
              <Image
                source={require('../../Assets/Icons/heart.png')}
                style={[styles.icon, {tintColor: 'white'}]}
                resizeMode={'contain'}
              />
            )}
          </View>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Bold',
              fontSize: 10,
              letterSpacing: 0.2,
              alignSelf: 'center',
              marginTop: 10,
            }}>
            {likcon}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setCom(true);
          }}
          style={{padding: 10}}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              height: 55,
              width: 55,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Image
              source={require('../../Assets/Icons/comment.png')}
              style={[styles.icon]}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
        {item?.comments.length != '0' && (
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Bold',
              fontSize: 10,
              letterSpacing: 0.2,
              alignSelf: 'center',
            }}>
            {item?.comments.length}
          </Text>
        )}
        <TouchableOpacity onPress={() => onShare()} style={{padding: 10}}>
          <View
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              height: 55,
              width: 55,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Image
              source={require('../../Assets/Icons/share.png')}
              style={[styles.icon]}
              resizeMode={'contain'}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <Modal
          backButtonClose={true}
          animationType="slide"
          transparent={true}
          visible={com}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              height: Dimensions.get('window').height,
              alignContent: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setCom(false)}
              style={{
                height: Dimensions.get('window').height - 500,
              }}
            />
            <View
              style={{
                maxHeight: 400,
                maxWidth: 350,
                marginLeft: 20,
              }}>
              <ScrollView
                ref={ref => {
                  this.scrollView = ref;
                }}
                onContentSizeChange={() =>
                  this.scrollView.scrollToEnd({animated: true})
                }>
                {item?.comments?.map(pops => {
                  return (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => setCom(false)}
                      style={[styles.row]}>
                      <Image
                        source={{uri: pops?.user?.picture?.url}}
                        style={[styles.avatar]}
                      />
                      <View>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: colors.white,
                            fontFamily: 'Poppins-Bold',
                            letterSpacing: 0.2,
                            fontSize: 14,
                            marginHorizontal: 10,
                          }}>
                          {pops?.user?.name}
                        </Text>
                        <Text
                          style={[
                            {
                              color: colors.white,
                              fontFamily: 'Poppins-Medium',
                              letterSpacing: 0.2,
                              fontSize: 12,
                              marginHorizontal: 10,
                            },
                          ]}>
                          {pops?.comment}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'flex-end',

                alignItems: 'center',
              }}
              onPress={() => setCom(false)}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#1F222A',
                  height: 60,
                  width: Dimensions.get('window').width - 40,
                  marginBottom: 30,
                  borderRadius: 12,
                }}>
                <TextInput
                  placeholder="Write Your Comments....."
                  placeholderTextColor={'#9E9E9E'}
                  value={tesx}
                  onChangeText={setTesx}
                  style={{
                    padding: 20,

                    height: 60,
                    width: Dimensions.get('window').width - 100,
                    marginBottom: 50,
                    color: colors.white,
                    fontFamily: 'Poppins-Regular',
                    letterSpacing: 0.2,
                    fontSize: 12,
                  }}
                />
                <TouchableOpacity
                  style={{justifyContent: 'center', alignItems: 'center'}}
                  onPress={() => {
                    commen();
                  }}>
                  <Image
                    source={require('../../Assets/Image/Send.png')}
                    style={styles.sendbtn}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    marginHorizontal: 10,
    marginVertical: 5,
    height: 25,
    width: 25,
  },

  sideBar: {
    width: 80,
    position: 'absolute',
    zIndex: 1000,
    right: 0,
    alignItems: 'center',
  },
  iconOuter: {
    marginVertical: 15,
  },
  center: {
    alignItems: 'center',
  },
  imageOuter: {
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 100,
    marginRight: 5,
    backgroundColor: '#d1d1d6',
  },
  userName: {
    marginHorizontal: 10,
    color: colors.white,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.2,
    fontSize: 14,
  },
  followbtn: {
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  sendbtn: {
    width: 20,
    height: 20,
  },
});
export default SingleReel;
