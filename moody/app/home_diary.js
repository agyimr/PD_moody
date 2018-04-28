import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, Button, DatePickerAndroid, SectionList, TouchableOpacity } from 'react-native';
import { ListItem } from './common/listitem';
import { GREY, WHITE, PRIMARY } from './common/colors';

export class DiaryScreen extends React.Component {
  dummyData = [
    { title: new Date(2018, 4, 1), key: "0", data: [
      {title: "Title1", description: "Description1", key: "0"},
      {title: "Title2", description: "Description2", key: "1"},
      {title: "Title3", description: "Description3", key: "2"}]
    },
    { title: new Date(2018, 5, 1), key: "1", data: [
      {title: "Title1", description: "Description1", key: "4"},
      {title: "Title2", description: "Description2", key: "5"},
      {title: "Title3", description: "Description3", key: "6"},
      {title: "Title4", description: "Description4", key: "7"}]
    },
    { title: new Date(2018, 6, 1), key: "2", data: [
      {title: "Title5", description: "Description5", key: "8"},
      {title: "Title6", description: "Description6", key: "9"},
      {title: "Title7", description: "Description7", key: "10"},
      {title: "Title8", description: "Description8", key: "11"}]
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          style={{ paddingLeft: 15, paddingRight: 15 }}
          sections={this.dummyData}
          renderSectionHeader={({section}) => this.renderHeader(section)}
          stickySectionHeadersEnabled={true}
          renderItem={({item}) => <ListItem title={item.title} description={item.description} key={item.key} />}
        />
        <TouchableOpacity onPress={this.pickDate} 
          title="Search"
          style={[floating, { right: 20, bottom: 110, backgroundColor: PRIMARY } ]}>
          <Icon name="search" size={30} color={WHITE} />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={this.onRateTodayPress} 
          title="Addrate" 
          style={[floating, { right: 20, bottom: 20, backgroundColor: PRIMARY }]}>
          <Icon name="add" size={30} color={WHITE} />
        </TouchableOpacity>
      </View>
    );
  }

  onRateTodayPress() {
    // TODO: navigate to rating today.
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