import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, WebView, AsyncStorage } from 'react-native';
import { Card } from './common/card';
import { CustomLineChart } from './common/linechart';
import { BLACK, LIGHT_PRIMARY, GREY, PRIMARY } from './common/colors';
import { StackNavigator } from 'react-navigation';
import * as stopword from 'stopword';

export class GraphsScreen extends React.Component {
  ONE_AND_A_HALF_YEAR = 44578800000;
  ONE_DAY = 86400000;
  webview_loaded = false;
  allSData = [];
  allHData = [];
  state = { sIndex: 2, hIndex: 2, sData: this.createPlaceHolders(), hData: this.createPlaceHolders() };

  createPlaceHolders() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const holders = [];
    const init_date = new Date(today.valueOf() - this.ONE_AND_A_HALF_YEAR);
    let date = init_date;

    while (today.valueOf() >= date.valueOf()) {
      holders.push({ date, value: 0 });
      date = new Date(date.valueOf() + this.ONE_DAY);
    }
    return holders;
  }

  async componentWillMount() {
    const hPlaceHolders = this.state.hData;
    const sPlaceHolders = this.state.sData;
    const db_string = await AsyncStorage.getItem("db");
    if (!db_string) return;

    const db = JSON.parse(db_string);
    db.forEach(item => {
      const date = new Date(item.date);

      if (date.valueOf() >= hPlaceHolders[0].date.valueOf()) {
        const diff = date.valueOf() - hPlaceHolders[0].date.valueOf();
        const index = Math.floor(diff / this.ONE_DAY); // in theory it's always integer
        hPlaceHolders[index].value = this.getMood(item);
        sPlaceHolders[index].value = item.social_rate;
      }
    });
    this.allHData = hPlaceHolders;
    this.allSData = sPlaceHolders;
    this.setState({ 
      hData: this.getData(this.allHData, this.state.hIndex), 
      sData: this.getData(this.allSData, this.state.sIndex) 
    });
  }

  getData(data, circle_state) {
    return data.slice(circle_state * 172, (circle_state + 1) * 172 );
  }

  getMood({ range, angle }) {
    const score = range * angle;
    return (score + 18000) / 360;
  }

  setPaginationState(type, newVal) {
    if (type === "social") {
      this.setState({
        sIndex: newVal,
        sData: this.getData(this.allSData, newVal)
      })
    } else {
      this.setState({
        hIndex: newVal,
        hData: this.getData(this.allHData, newVal)
      })
    }
  }

  setBackgroundColor(type, i) {
    return type === "social"
      ? { backgroundColor: this.state.sIndex === i ? LIGHT_PRIMARY : GREY }
      : { backgroundColor: this.state.hIndex === i ? LIGHT_PRIMARY : GREY }
  }

  renderCircles(type) {
    const circles = [];
    for (let i = 0; i < 3; i++) {
      circles.push(
        <TouchableOpacity style={{ padding: 5 }} onPress={() => { this.setPaginationState(type, i) }} key={`${type == "social" ? i : i + 10}`}>
          <View style={[circle, this.setBackgroundColor(type, i)]} />
        </TouchableOpacity>
      );
    }
    return circles;
  }

  render() {
    const webviewContent = require('./wordcloud/index.html')
    return (
      <ScrollView style={{ flex: 1, backgroundColor: GREY, paddingTop: 4 }}>
        <Card>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: BLACK }}>Frequent words</Text>
          <Text style={{ fontSize: 14 }}>The most frequent words you used are listed below.</Text>
          <View style={{width: "100%", height: 215}} pointerEvents="none">
            <WebView 
              scalesPageToFit={true}
              scrollEnabled={false}
              onLoad={this.onWebViewLoad}
              ref={webview => {this.webViewRef = webview;}}
              source={webviewContent}  />
          </View>
        </Card>
        <Card>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: BLACK }}>Happiness</Text>
          <Text style={{ fontSize: 14 }}>What happened lately?</Text>
          <CustomLineChart data={this.state.hData} />
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            {this.renderCircles("happy")}
          </View>
          <TouchableOpacity onPress={() => { this.navigateToHappiness() }}>
            <Text style={more}>MORE</Text>
          </TouchableOpacity>
        </Card>
        <Card>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: BLACK }}>Social life</Text>
          <Text style={{ fontSize: 14 }}>How was your social life?</Text>
          <CustomLineChart data={this.state.sData} />
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            {this.renderCircles("social")}
          </View>
          <TouchableOpacity onPress={() => {this.naviateToSocial()}}>
            <Text style={more}>MORE</Text>
          </TouchableOpacity>
        </Card>
        <View style={{ height: 8, width: '100%' }}/>
      </ScrollView>
    );
  }

  // WORDCLOUD
  onWebViewLoad = async () => {
    const db_string = await AsyncStorage.getItem("db");
    if (!db_string) return;

    const db = JSON.parse(db_string);
    
    const text = db
      .map(item => item.text)
      .reduce((acc, curr) => `${acc} ${curr}`, "");

    const array_of_words = stopword.removeStopwords(text.split(' '));
    counter = {};

    array_of_words.forEach(word => {
        counter[word] = (counter[word] || 0) + 1;
    });

    results = [];
    for (let key in counter) {
      results.push([key, counter[key]]);
    }

    results.sort((a, b) => (b[1] - a[1]));
    const max = results[0][1];
    console.log(max);
    const res = results.map(a => [a[0], (a[1] * (25/max))]).slice(0, 50);
    this.webViewRef.postMessage(JSON.stringify(res));
  }

  navigateToHappiness() {
    const navParams = {
      category: "Happiness",
      activities: {
        work: 0.55,
        study: 0.40,
        family: 0.90,
        sport: 0.74
      },
      advices: `According to your ratings, it seems that you should spend more time with sport and family, while decreasing the amount of time spent with activities related work and study. Try to allocate a bit more time for doing exercises, even 30 minutes a day can have a lot of positive outcome.`
    }
    this.props.navigation.navigate('GraphsDetail', navParams)
  }

  naviateToSocial() {
    const navParams = {
      category: "Social Life",
      activities: {
        work: 0.2,
        study: 0.70,
        family: 0.90,
        sport: 0.34
      },
      advices: `ASDASDasdasd`
    }
    this.props.navigation.navigate('GraphsDetail', navParams)
  }
}

const circle = {
  width: 10,
  height: 10,
  borderRadius: 5
}

const more = {
  color: PRIMARY,
  fontSize: 17,
  paddingTop: 5
};