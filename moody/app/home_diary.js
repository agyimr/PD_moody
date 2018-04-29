import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, Button, DatePickerAndroid, SectionList, TouchableOpacity } from 'react-native';
import { ListItem } from './common/listitem';
import { GREY, WHITE, PRIMARY } from './common/colors';
import { StackNavigator } from 'react-navigation';

export class DiaryScreen extends React.Component {  
  dummyData = [
    { title: new Date(2018, 4, 1), key: "0", data: [
      {title: "Title1", description: "Description1", mood: "relaxed", rating: "3", activity: "work", key: "0"},
      {title: "Title2", description: "Description2", mood: "relaxed", rating: "2", activity: "study", key: "1"},
      {title: "Title3", description: "Description3", mood: "relaxed", rating: "4", activity: "sport", key: "2"}]
    },
    { title: new Date(2018, 5, 1), key: "1", data: [
      {title: "Title1", description: "Description1", mood: "relaxed", rating: "5", activity: "study", key: "4"},
      {title: "Title2", description: "Description2", mood: "relaxed", rating: "2", activity: "work", key: "5"},
      {title: "Title3", description: "Description3", mood: "relaxed", rating: "3", activity: "sport", key: "6"},
      {title: "Title4", description: "Description4", mood: "relaxed", rating: "3", activity: "work", key: "7"}]
    },
    { title: new Date(2018, 6, 1), key: "2", data: [
      {title: "Title5", description: "Description5", mood: "relaxed", rating: "5", activity: "work", key: "8"},
      {title: "Title6", description: "Description6", mood: "relaxed", rating: "2", activity: "study", key: "9"},
      {title: "Title7", description: "Description7", mood: "relaxed", rating: "3", activity: "work", key: "10"},
      {title: "Title8", description: "Description8", mood: "relaxed", rating: "3", activity: "work", key: "11"}]
    }
  ]

  async pickDate() {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({ date: new Date() });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.filter = { date: new Date(year, month, day) };
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  renderListItem(item) {
    return <ListItem
      onPress={() => {this.props.navigation.navigate('DiaryDetail', item)}}
      title={item.title}
      description={item.description}
      key={item.key}
    />
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          style={{ paddingLeft: 15, paddingRight: 15 }}
          sections={this.dummyData}
          renderSectionHeader={({section}) => this.renderHeader(section)}
          stickySectionHeadersEnabled={true}
          renderItem={({item}) => this.renderListItem(item)}
        />
        <TouchableOpacity onPress={this.pickDate} 
          title="Search"
          style={[floating, { right: 20, bottom: 110, backgroundColor: PRIMARY } ]}>
          <Icon name="search" size={30} color={WHITE} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {this.onRateTodayPress()}} 
          title="Addrate" 
          style={[floating, { right: 20, bottom: 20, backgroundColor: PRIMARY }]}>
          <Icon name="add" size={30} color={WHITE} />
        </TouchableOpacity>
      </View>
    );
  }

  onRateTodayPress() {
    this.props.navigation.navigate('DailySummary');
  }

  renderHeader(section) {
    return (
      <View style={{ backgroundColor: WHITE, width: '100%' }} key={section.key}>
        <Text style={{ padding: 20 }}>{this.getHeader(section.title)}</Text>
      </View>
    );
  }

  getHeader(date) {
    const months = ["Jan", "Febr", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  }
}

const floating = {
  width: 70,
  height: 70,
  position: "absolute",
  borderRadius: 35, 
  justifyContent: 'center', 
  alignItems: 'center',
  elevation: 10
};