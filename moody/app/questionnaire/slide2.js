import React from 'react';
import { View, Text, Image } from 'react-native';
import { CircularSlider } from './circular_slider';

export class Slide2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { slider1: '' };
  }

  onValueChange(value) {
    // console.log(value)
    this.setState({ slider1: value })
  }

  render() {
    return (
      <View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingBottom: 0 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }} >How was your day?</Text>
          <Image
            style={{ width: 50, height: 50 }}
            source={require('./logo.png')}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text>Move the circle to the mood best describing your day. You can leave it between two position also.</Text>
        </View>
        <View style={{ alignItems: 'center' }} >
          <CircularSlider outerSize={380} innerSize={280} value={this.state.slider1} onValueChange={(value) => this.onValueChange(value)} />
        </View>
      </View >
    );
  }
}