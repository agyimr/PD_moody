import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GREY, YELLOW } from '../common/colors';


export class Slide3 extends React.Component {
  question = 'How social was your day?';

  constructor(props) {
    super(props);
    this.state = { social_rate: 1 };
  }

  onValueChange(value) {
    this.props.socialChanged(value);
    this.setState({ social_rate: value });
  }

  renderRating(rating) {
    const star = [...Array(rating)].map((e, i) => <Icon name='star' size={70} color={YELLOW} key={i} />);
    const emptyStar = [...Array(5 - rating)].map((e, i) => <Icon name='star-border' size={70} color={YELLOW} key={i + 10} />);
    return star.concat(emptyStar);
  }

  renderButtons() {
    const buttons = [...Array(5)].map((e, i) => {
      return (<TouchableOpacity
        style={{ height: 50, width: 50 }}
        onPress={() => this.onValueChange(i+1)}
        key={i}
      >
        <Text></Text>
      </TouchableOpacity>
      )
    });
    return buttons;
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
        <View style={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: 100 }} >
          <View style={{ position: 'absolute', display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
            {this.renderRating(this.state.social_rate)}
          </View>
          <View style={{ position: 'absolute', display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
            {this.renderButtons()}
          </View>
        </View>
      </View>
    );
  }
}