import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PRIMARY } from '../common/colors';
import Swiper from 'react-native-swiper';
import { Slide1 } from './slide1';
import { Slide2 } from './slide2';
import { Slide3 } from './slide3';
import { Slide4 } from './slide4';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})


export class DailySummary extends React.Component {

  render() {
    return (
      <Swiper
        style={styles.wrapper}
        loop={false}
        showsButtons={true}
        buttonWrapperStyle={{ position: 'absolute', top: 270 }}
        nextButton={<Text style={{ fontSize: 20, fontWeight: 'bold', color: PRIMARY }} >NEXT</Text>}
        prevButton={<Text></Text>}
        scrollEnabled={false}
      >
        <Slide1 />
        <Slide2 />
        <Slide3 />
        <Slide4 />
      </Swiper>
    );
  }
}