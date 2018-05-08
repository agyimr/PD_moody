import React from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { PRIMARY } from '../common/colors';
import Swiper from 'react-native-swiper';
import { Slide1 } from './slide1';
import { Slide2 } from './slide2';
import { Slide3 } from './slide3';
import { Slide4 } from './slide4';

export class DailySummary extends React.Component {
  state = {
    text: "",
    range: 0, 
    angle: 0,
    social_rate: 1,
    work: false,
    study: false,
    family: false,
    sport: false,
  }

  textChanged = text => { this.setState({ text }) };
  moodChanged = ({ range, angle }) => { this.setState({ range, angle }) };
  socialChanged = social_rate => { this.setState({ social_rate }) };
  activityChanged = key => { this.setState({ [key]: !this.state[key] }) };

  getTodayTime() {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }
  
  getItem() {
    const { text, range, angle, social_rate, work, study, family, sport } = this.state;
    return { text, range, angle, social_rate, work, study, family, sport, date: this.getTodayTime() };
  }

  async onSubmit() {
    const db_string = await AsyncStorage.getItem("db");
    const item = this.getItem();
    if (!db_string) {
      const arr = [item];
      await AsyncStorage.setItem("db", JSON.stringify(arr));
    } else {
      const db = JSON.parse(db_string);
      db.push(item);
      await AsyncStorage.setItem("db", JSON.stringify(db));
    }
    this.props.navigation.navigate('Diary');
  }

  render() {
    return (
      <Swiper
        loop={false}
        showsButtons={true}
        buttonWrapperStyle={{ position: 'absolute', top: 270 }}
        nextButton={<Text style={{ fontSize: 20, color: PRIMARY, marginRight: 20 }} >READY</Text>}
        prevButton={<Text></Text>}
        scrollEnabled={false}
      >
        <Slide1 textChanged={this.textChanged}/>
        <Slide2 moodChanged={this.moodChanged}/>
        <Slide3 socialChanged={this.socialChanged}/>
        <Slide4 activityChanged={this.activityChanged} onSubmit={() => { this.onSubmit() }}/>
      </Swiper>
    );
  }
}