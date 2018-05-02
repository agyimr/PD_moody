import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { GREY } from '../common/colors';

export class Slide1 extends React.Component {
  question = 'Say something about your\nday...';
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onChangeText = text => {
    this.props.textChanged(text);
    this.setState({ text });
  }

  render() {
    return (
      <View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <Text style={{ fontSize: 24 }} >{this.question}</Text>
          <Image
            style={{ width: 50, height: 50 }}
            source={require('./logo.png')}
          />
        </View>
        <TextInput
          multiline={true}
          style={{ margin: 20 }}
          onChangeText={this.onChangeText}
          value={this.state.text}
          placeholder={'Type it here...'}
        />
      </View>
    );
  }
}