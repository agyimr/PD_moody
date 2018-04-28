import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Card } from './common/card';
import { CustomLineChart } from './common/linechart';
import { BLACK, LIGHT_PRIMARY, GREY, PRIMARY } from './common/colors';

const data = require("./graph_sample.json");

export class GraphsScreen extends React.Component {
  state = { sIndex: 2, hIndex: 2 };

  tagList =[
    { title: 'Item1', point: 0 },
    { title: 'LongItem2', point: 1 },
    { title: 'Item3', point: 2 },
    { title: 'LongItem4', point: 1 },
    { title: 'LongLongItem5', point: 1 },
    { title: 'Item6', point: 0 },
    { title: 'LongItem7', point: 2 },
    { title: 'Item8', point: 0 },
    { title: 'Item9', point: 1 },
    { title: 'LongLongItem10', point: 2 },
  ];
  colorList = ['red', 'green', 'blue'];

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
    for(let i = 0; i < 3; i++) {
      circles.push(
        <TouchableOpacity style={{ padding: 5 }} onPress={() => { this.setPaginationState(type, i) }} key={`${type == "social" ? i : i + 10}`}>
          <View style={[circle, this.setBackgroundColor(type, i)]} />
        </TouchableOpacity>
      );
    }
    return circles;
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Card>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: BLACK }}>Happiness</Text>
          <Text style={{ fontSize: 14 }}>What happened lately?</Text>
          <CustomLineChart data={data}/>
          <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            {this.renderCircles("happy")}
          </View>
          <TouchableOpacity onPress={this.navigateToHappiness}>
            <Text style={more}>MORE</Text>
          </TouchableOpacity>
        </Card>
        <Card>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: BLACK }}>Social life</Text>
          <Text style={{ fontSize: 14 }}>How was your social life?</Text>
          <CustomLineChart data={data}/>
          <View style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
            {this.renderCircles("social")}
          </View>
          <TouchableOpacity onPress={this.naviateToSocial}>
            <Text style={more}>MORE</Text>
          </TouchableOpacity>
        </Card>
        <Card>
        </Card>
      </ScrollView>
    );
  }

  navigateToHappiness() {
    // TODO: make single page and plug it in...
  }

  naviateToSocial() {
    // TODO:...
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