import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {useSelector} from 'react-redux';
import {getComment} from '../../Redux/slices/userSlice';
import {Apis} from '../../Utils/Constant';
import Loader from '../Loader/Loader';
import {videoData} from './Database';
import SingleReel from './SingleReel';

const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dato, setDato] = useState();
  const [loader, setLoader] = useState(false);
  const handleChangeIndexValue = ({index}) => {
    setCurrentIndex(index);
  };
  const comm = useSelector(getComment);
  useEffect(() => {
    Video();
  }, [useIsFocused, comm]);
  const Video = () => {
    setLoader(true);
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${Apis}/post/posts`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios(config)
      .then(function (response) {
        // console.log('posts', JSON.stringify(response.data.result));
        setDato(response?.data?.result);

        setTimeout(() => {
          setLoader(false);
        }, 2000);
      })
      .catch(function (error) {
        setLoader(false);
        // console.log(error.response.data.response.message);
      });
  };

  return (
    <>
      {loader && <Loader />}
      <SwiperFlatList
        vertical={true}
        onChangeIndex={handleChangeIndexValue}
        data={dato}
        renderItem={({item, index}) => (
          <SingleReel
            item={item}
            index={index}
            currentIndex={currentIndex}
            Videocall={Video}
          />
        )}
        keyExtractor={(item, index) => index}
      />
    </>
  );
};

export default ReelsComponent;
