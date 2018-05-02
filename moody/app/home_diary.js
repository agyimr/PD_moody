import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, Button, DatePickerAndroid, SectionList, TouchableOpacity, AsyncStorage } from 'react-native';
import { ListItem } from './common/listitem';
import { GREY, WHITE, PRIMARY } from './common/colors';

export class DiaryScreen extends React.Component {
  displayMessage = "You haven't rated so far.";
  state = { showMessage: true };
  key = 0;

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

  formatData(database) {
    this.data = [];
    database.forEach(item => {
      const date = new Date(item.date);
      const itemDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const index = this.data.findIndex(d => d.title.valueOf() === itemDate.valueOf());
      const newEntry = { 
        title: `${this.getDate(date)}, ${this.getWeekDay(date)}`,
        description: item.text,
        key: this.key,
      }
      this.key += 1;
      if (index !== -1) { this.data[index].data.push(newEntry) }
      else {
        const divider = this.createDivider(itemDate);
        divider.data.push(newEntry);
        this.data.push(divider)
      }
    });
  }

  getWeekDay(date) {
    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    return weekdays[date.getDay()];
  }

  getDate(date) {
    switch (date.getDate()) {
      case 1:
          return `1st`;
      case 2:
          return `2nd`;
      case 3:
          return `3rd`;
      default:
        return `${date.getDate()}th`;
    }
  }

  createDivider(date) {
    const divider = { title: date, key: this.key, data: [] };
    this.key += 1;
    return divider;
  }


  async componentWillMount() {
    const database_string = await AsyncStorage.getItem("db");
    if (!database_string) return;

    const database = JSON.parse(database_string);

    if (database !== []) {
      console.log(database);
      this.formatData(database);
      this.setState({ showMessage: false });
    } else {
      this.setState({ showMessage: true });
    }
  }

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

  renderMessage() {
    return <Text style={{ padding: 15, fontSize: 15, fontStyle: "italic" }}>{this.displayMessage}</Text>;
  }

  renderList() {
    return <SectionList
      style={{ paddingLeft: 15, paddingRight: 15 }}
      sections={this.data}
      renderSectionHeader={({section}) => this.renderHeader(section)}
      stickySectionHeadersEnabled={true}
      renderItem={({item}) => this.renderListItem(item)}
    />
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.showMessage ? this.renderMessage() : this.renderList()}

        
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