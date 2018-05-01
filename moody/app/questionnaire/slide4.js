import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { PRIMARY, WHITE } from '../common/colors';

export class Slide4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      work: false,
      study: false,
      family: false,
      sport: false,
    };
  }

  toggleState(key) {
    this.setState({
      [key]: !this.state[key]
    })
  }

  renderButtons() {
    const listOfButtons = ['work', 'study', 'family', 'sport'];
    const buttons = listOfButtons.map((text) => {
      return (
        <TouchableOpacity
          style={this.state[text] ? selectedButton : unSelectedButton}
          onPress={() => this.toggleState(text)}
          key={text}
        >
          <Text style={this.state[text] ? selectedText : unSelectedText}>{text.toUpperCase()}</Text>
        </TouchableOpacity>
      )
    });
    return buttons;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingBottom: 0 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }} >What did you spent time with today?</Text>
          <Image
            style={{ width: 50, height: 50 }}
            source={require('./logo.png')}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text>You can select multiple options.</Text>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: 20, justifyContent: 'center' }}>
          {this.renderButtons()}
        </View>
        <View style={{ position: 'absolute', display: 'flex', alignItems: 'flex-end', bottom: 20, right: 10 }} >
          <TouchableOpacity>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: PRIMARY}} >READY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const selectedButton = {
  width: 150,
  backgroundColor: PRIMARY,
  borderColor: PRIMARY,
  borderWidth: 2,
  padding: 10,
  margin: 5,
  alignItems: 'center'
}

const unSelectedButton = {
  width: 150,
  backgroundColor: WHITE,
  borderColor: PRIMARY,
  borderWidth: 2,
  padding: 10,
  margin: 5,
  alignItems: 'center'
}

const selectedText = {
  color: WHITE,
  fontSize: 20
}

const unSelectedText = {
  color: PRIMARY,
  fontSize: 20
}