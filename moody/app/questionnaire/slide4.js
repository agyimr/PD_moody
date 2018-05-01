import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { PRIMARY, WHITE } from '../common/colors';

export class Slide4 extends React.Component {
  question = 'What did you spent time\nwith today?';

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
    this.props.activityChanged(key);
    this.setState({
      [key]: !this.state[key]
    });
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

  onSubmit = () => {
    this.props.onSubmit();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingBottom: 0 }}>
          <Text style={{ fontSize: 24 }} >{this.question}</Text>
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
          <TouchableOpacity onPress={this.onSubmit}>
            <Text style={{ fontSize: 20, color: PRIMARY, marginRight: 10}} >READY</Text>
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