import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card } from './common/card';
import { GREY, BLACK } from './common/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BarChart, XAxis } from 'react-native-svg-charts';

export class StatisticsScreen extends React.Component {



  renderCards() {
    const data = [
      [70,40,100],
      [30,10,40],
      [80,70,90],
      [70,30,60]
    ];

    const stats = [
      // {
      //   title: 'Work',
      //   icon: 'business-center',
      //   happiness: 70,
      //   sentiment: 40,
      //   social_life: 100,
      //   note: 'You seem to enjoy working, keep on!'
      // },
      // {
      //   title: 'Study',
      //   happiness: 30,
      //   sentiment: 10,
      //   social_life: 40,
      //   note: 'You should consider changing edu-line.'
      // },
      // {
      //   title: 'Family',
      //   happiness: 80,
      //   sentiment: 70,
      //   social_life: 90,
      //   note: 'Spend more time with your family'
      // },
      {
        title: 'Sport',
        icon: 'directions-bike',
        happiness: 70,
        sentiment: 30,
        social_life: 60,
        note: 'You feel comfortable doing sport, that\'s cool!'
      }
    ];

    return stats.map((cardData, index) => {
      const fill = 'rgb(134, 65, 244)'
      return (
        <Card key={cardData.title}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ width: 200 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 40, color: BLACK }} >{cardData.title}</Text>
              <Text style={{ fontSize: 14 }} >{cardData.note}</Text>
            </View>
            <Icon name={cardData.icon} size={100} color={GREY} />
          </View>
          <BarChart
            style={{ height: 200 }}
            data={data[index]}
            svg={{ fill }}
            contentInset={{ top: 30, bottom: 30 }}
          />
        </Card>
      )
    });
  }

  render() {

    return (
      <ScrollView style={{ flex: 1 }}>
        <Card>
          <Text style={{ fontWeight: 'bold', fontSize: 40 }}>Happiness</Text>
          <Text style={{ fontSize: 14 }}>What happened lately?</Text>
        </Card>
        {this.renderCards()}
      </ScrollView>
    );
  }
}