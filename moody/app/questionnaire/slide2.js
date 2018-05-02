import React from 'react';
import { View, Text, Image } from 'react-native';
import { CircularSlider } from './circular_slider';

export class Slide2 extends React.Component {
  question = 'What was your mood like\ntoday?'

  constructor(props) {
    super(props);
    this.state = { range: 0, angle: 0 };
  }

  onValueChange({ range, angle }) {
    this.props.moodChanged({ range, angle });
    this.setState({ range, angle });
  }

  render() {
    return (
      <View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingBottom: 0 }}>
          <Text style={{ fontSize: 24 }} >{this.question}</Text>
          <Image
            style={{ width: 50, height: 50 }}
            source={require('./logo.png')}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text>Move the circle to the mood best describing your day. You can leave it between two position also.</Text>
        </View>
        <View style={{ alignItems: 'center' }} >
          <CircularSlider outerSize={380} innerSize={280} value={this.state.slider} onValueChange={(value) => this.onValueChange(value)} />
        </View>
      </View >
    );
  }
}