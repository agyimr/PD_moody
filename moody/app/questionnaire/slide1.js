import React from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import { GREY } from '../common/colors';

export class Slide1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    return (
      <View>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Say something about your day</Text>
          <Image
            style={{ width: 50, height: 50 }}
            source={require('./logo.png')}
          />
        </View>
        <TextInput
          multiline={true}
          style={{ margin: 20, borderColor: GREY, borderWidth: 1 }}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
          placeholder={'Type it here...'}
        />
      </View>
    );
  }
}