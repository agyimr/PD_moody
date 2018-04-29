import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BarChart, YAxis, XAxis } from 'react-native-svg-charts';
import { StackNavigator } from 'react-navigation';
import * as scale from 'd3-scale';
import { Card } from './common/card';
import { PRIMARY, GREY, BLACK } from './common/colors';

export class StatisticsScreen extends React.Component {

  renderCards() {
    const data = [
      [
        { label: 'happiness', value: 100 },
        { label: 'sentiment', value: 10 },
        { label: 'social life', value: 10 }
      ],
      [
        { label: 'happiness', value: 10 },
        { label: 'sentiment', value: 100 },
        { label: 'social life', value: 10 }
      ],
      [
        { label: 'happiness', value: 100 },
        { label: 'sentiment', value: 100 },
        { label: 'social life', value: 100 }
      ],
      [
        { label: 'happiness', value: 50 },
        { label: 'sentiment', value: 10 },
        { label: 'social life', value: 50 }
      ]
    ];

    const stats = [
      {
        title: 'Work',
        icon: 'business-center',
        note: 'You seem to enjoy working, keep on!'
      },
      {
        title: 'Study',
        icon: 'school',
        note: 'You should consider changing edu-line.'
      },
      {
        title: 'Family',
        icon: 'people',
        note: 'Spend more time with your family'
      },
      {
        title: 'Sport',
        icon: 'directions-bike',
        note: 'You feel comfortable doing sport, that\'s cool!'
      }
    ];

    const axesSvg = { fontSize: 14, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 10;
    const fill = PRIMARY;

    return stats.map((cardData, index) => {
      chartNumbers = data[index]
      return (
        <Card key={cardData.title}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: 200 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 40, color: BLACK }} >{cardData.title}</Text>
              <Text style={{ fontSize: 14 }} >{cardData.note}</Text>
            </View>
            <Icon name={cardData.icon} size={100} color={GREY} />
          </View>
          <View style={{ height: 150, flexDirection: 'row', paddingTop: 10 }}>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <BarChart
                style={{ height: 100 }}
                data={chartNumbers}
                spacingInner={0.5}
                spacingOuter={0.2}
                gridMax={100}
                gridMin={0}
                yAccessor={({ item }) => item.value}
                xAccessor={({ item }) => item.label}
                contentInset={verticalContentInset}
                svg={{ fill }}
              />
              <XAxis
                style={{ marginHorizontal: 0, height: xAxisHeight }}
                data={chartNumbers}
                scale={scale.scaleBand}
                spacingInner={0.6}
                spacingOuter={0.2}
                formatLabel={(value, index) => chartNumbers[index].label}
                contentInset={{ left: 10, right: 10 }}
                svg={axesSvg}
              />
            </View>
          </View>
          <TouchableOpacity onPress={() => { this.naviateToStatDetail(cardData.title) }}>
            <Text style={more}>MORE</Text>
          </TouchableOpacity>
        </Card>
      )
    });
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        {this.renderCards()}
      </ScrollView>
    );
  }

  naviateToStatDetail(title) {
    this.props.navigation.navigate('StatisticsDetail', title)
  }
}

const more = {
  color: PRIMARY,
  fontSize: 17,
  paddingTop: 5
};