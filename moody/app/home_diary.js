import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, Button, DatePickerAndroid, SectionList } from 'react-native';
import { ListItem } from './common/listitem';
import { GREY, WHITE, PINK } from './common/colors';

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
        <Button onPress={this.pickDate} title="Search">Search...</Button>
        <SectionList
          style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 15 }}
          sections={this.dummyData}
          renderSectionHeader={({section}) => this.renderHeader(section)}
          stickySectionHeadersEnabled={true}
          renderItem={({item}) => <ListItem title={item.title} description={item.description} key={item.key} />}
        />
        <View 
          onPress={this.onRateTodayPress} 
          title="Addrate" 
          style={{ 
            position: "absolute",
            right: 30, 
            bottom: 30, 
            width: 70, 
            height: 70, 
            borderRadius: 35, 
            backgroundColor: PINK, 
            justifyContent: 'center', 
            alignItems: 'center',
            elevation: 10}}>
          <Icon name="add" size={30} color={WHITE} />
        </View>
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