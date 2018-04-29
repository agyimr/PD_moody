import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, WebView } from 'react-native';
import { Card } from './common/card';
import { CustomLineChart } from './common/linechart';
import { BLACK, LIGHT_PRIMARY, GREY, PRIMARY } from './common/colors';
import { StackNavigator } from 'react-navigation';
const data = require("./graph_sample.json");

export class GraphsScreen extends React.Component {
  state = { sIndex: 2, hIndex: 2 };
  list_data = [["Web Technologies", 26],["HTML", 20],["<canvas>", 20],["CSS", 15],["JavaScript", 15],["Document Object Model", 12],["<audio>", 12],["<video>", 12],["Web Workers", 12],["XMLHttpRequest", 12],["SVG", 12],["JSON.parse()", 9 ],["Geolocation", 9 ],["data attribute", 9 ],["transform", 9 ],["transition", 9 ],["animation", 9 ],["setTimeout", 7 ],["@font-face", 7 ],["Typed Arrays", 7 ],["FileReader API", 7 ],["FormData", 7 ],["IndexedDB", 7 ],["getUserMedia()", 7 ],["postMassage()", 7 ],["CORS", 7 ],["strict mode", 6 ],["calc()", 6 ],["supports()", 6 ],["media queries", 6 ],["full screen", 6 ],["notification", 6 ],["orientation", 6 ],["requestAnimationFrame", 6 ],["border-radius", 5 ],["box-sizing", 5 ],["rgba()", 5 ],["text-shadow", 5 ],["box-shadow", 5 ],["flexbox", 5 ],["viewpoint", 5 ]];

  getData() {
    // TODO: get data from asyncstorage, and if it's zero, we fill it with 0s.
    // sIndex: felevek
  }

  setPaginationState(type, newVal) {
    this.setState({
      sIndex: type === "social" ? newVal : this.state.sIndex,
      hIndex: type === "happy" ? newVal : this.state.hIndex,
    });
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
      <ScrollView style={{ flex: 1 }}>
      <Text>{`Statistics related to ${undefined}`}</Text>
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
          <CustomLineChart data={data} />
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
          <CustomLineChart data={data} />
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            {this.renderCircles("social")}
          </View>
          <TouchableOpacity onPress={() => {this.naviateToSocial()}}>
            <Text style={more}>MORE</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
    );
  }

  // WORDCLOUD
  onWebViewLoad = () => {
    this.webViewRef.postMessage(JSON.stringify(this.list_data));
  }

  navigateToHappiness() {
    const navParams = {
      category: "Hapiness",
      activities: {
        work: 0.55,
        study: 0.40,
        family: 0.90,
        sport: 0.74
      },
      advices: `According to your ratings, it seems that you should spend more time with sport and family, while decreasing the amount of time spent with activities related work and study. Try to allocate a bit more time for doing exercises, even 30 minutes a day can have a lot of positive outcome.`
    }
    this.props.navigation.navigate('GraphsDetail', navParams)
    // TODO: make single page and plug it in...
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