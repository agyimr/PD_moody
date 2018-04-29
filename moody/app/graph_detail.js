import React from 'react';
import { View, Text } from 'react-native';
import { PRIMARY } from './common/colors';

export class GraphDetail extends React.Component {

  render() {
    //const { params } = this.props.navigation.state;

    return (
      <View>
        <View style={{ padding: 20 }}>
          <Text style={{ color: PRIMARY, fontSize: 25, textAlign: 'center' }}>Happiness</Text>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 30 }}>Activities</Text>
          <View style={{ paddingTop: 20, paddingLeft: 20 }}>
            <Text>{Work}</Text>
            <Text>{Study}</Text>
            <Text>{Family}</Text>
            <Text>{Aport}</Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 30 }}>Advices</Text>
          <View style={{ paddingTop: 20, paddingLeft: 20 }}>
            <Text>According to your ratings, it seems that you should spend more time with sport and family, while decreasing the amount of time spent with activities related work and study. Try to allocate a bit more time for doing exercises, even 30 minutes a day can have a lot of positive outcome.</Text>
          </View>
        </View>
      </View>
    );
  }
}