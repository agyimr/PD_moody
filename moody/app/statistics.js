import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BarChart, YAxis, XAxis } from 'react-native-svg-charts';
import { StackNavigator } from 'react-navigation';
import * as scale from 'd3-scale';
import { Card } from './common/card';
import { PRIMARY, GREY, BLACK } from './common/colors';
import Sentiment from 'sentiment';

export class StatisticsScreen extends React.Component {
  state = { showMessage: true, data: [], categorical_db: [] };
  stats = [
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

  renderMessage() {
    return <Text style={{ padding: 15, fontSize: 15, fontStyle: "italic" }}>{this.displayMessage}</Text>;
  }

  renderCards() {
    const axesSvg = { fontSize: 14, fill: 'grey' };
    const verticalContentInset = { top: 10, bottom: 10 };
    const xAxisHeight = 10;
    const fill = PRIMARY;

    return this.stats.map((cardData, index) => {
      chartNumbers = this.state.data[index]
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
          <TouchableOpacity onPress={() => { this.navigateToStatDetail(cardData.title) }}>
            <Text style={more}>MORE</Text>
          </TouchableOpacity>
        </Card>
      )
    });
  }

  convertData(db) {
    const sentiment = new Sentiment();
    categorical_db = this.stats.map((category) => {
      filtered_db = db.filter((element) => element[category.title.toLowerCase()])
      return filtered_db
    });
    // cat_db is array of array of object, outer array is 4 length, the 4 categories, the inner contains the datapoint for a category, 
    data_to_display = categorical_db.map((category, i) => {
      sum_happiness = category.reduce((sum,value) => {
        return sum + (value.angle * value.range);
      }, 0)
      avg_happiness = (sum_happiness / category.length / 180) + 50 //to have a scale between 0-100
      sum_social_rate = category.reduce((sum,value) => {
        return sum + value.social_rate;
      }, 0)
      avg_social_rate = sum_social_rate / category.length / 5 * 100

      avg_sentiment = sentiment.analyze(category
        .map(c => c.text)
        .join(' ')).comparative * 100;

      return [
        { label: 'happiness', value: avg_happiness },
        { label: 'sentiment', value: avg_sentiment },
        { label: 'social life', value: avg_social_rate }
      ];
    });
    return data_to_display
  }

  async componentWillMount() {
    const database_string = await AsyncStorage.getItem("db");
    if (!database_string) return;

    const database = JSON.parse(database_string);

    if (database !== []) {
      // console.log(database);
      const data_to_display = this.convertData(database);
      this.setState({ showMessage: false, data: data_to_display});
    } else {
      // handle empty array
    }
  }
  
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: GREY, paddingTop: 4 }}>
        {this.state.showMessage ? this.renderMessage() : this.renderCards()}
        <View style={{ height: 8, width: '100%' }}/>
      </ScrollView>
    );
  }

  refresh() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', this.refresh.bind(this) ),
    ];
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }

  navigateToStatDetail(title) {
    this.props.navigation.navigate('StatisticsDetail', title)
  }
}

const more = {
  color: PRIMARY,
  fontSize: 17,
  paddingTop: 5
};