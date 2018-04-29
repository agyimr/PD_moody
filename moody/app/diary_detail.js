import React from 'react';
import { View, Text } from 'react-native';
import { PRIMARY } from './common/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export class DiaryDetail extends React.Component {

  renderRating(rating) {
    const star = [...Array(rating)].map((e, i) => <Icon name='star' size={50} color="yellow" key={i} />)
    const emptyStar = [...Array(5 - rating)].map((e, i) => <Icon name='star-border' size={50} color="yellow" key={i + 10} />)
    return star.concat(emptyStar)
  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View>
        <View style={{ padding: 20 }}>
          <Text style={{ color: PRIMARY, fontSize: 25, textAlign: 'center' }}>{params.title}</Text>
        </View>
        <View style={{ padding: 20 }}>
          <Text>You wrote about your day:</Text>
          <View style={{ paddingTop: 20, paddingLeft: 20 }}>
            <Text>{params.description}</Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text>You rated your mood as:</Text>
          <View style={{ paddingTop: 20, paddingLeft: 20 }}>
            <Text>{params.mood}</Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text>You rated your social life as:</Text>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', paddingTop: 20, paddingLeft: 20}} >
            {this.renderRating(params.rating)}
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text>Your day was spend mostly with:</Text>
          <View style={{ paddingTop: 20, paddingLeft: 20 }}>
            <Text>{params.activity}</Text>
          </View>
        </View>
      </View>
    );
  }
}